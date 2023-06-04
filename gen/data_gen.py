#!/usr/bin/env python3

'''
    Creates random data to fill the tables.

    Writes the query in an .sql file with a 
    default name data.sql
'''

import random
import datetime

def main():

    res_one = school_library_query()
    res_user = user_query(res_one["school_id"])
    res_book = book_query(res_one["school_id"]) 
    res_reserv = book_system_live(res_one["school_id"], res_book["isbn"], res_user["user_id"], res_one["bucket_admin_id"])
    res_creds = credentials(res_user["user_id"])
    res_rev = reviews(res_user["user_id"], res_book["isbn"])
    res_reg = registrations(res_one["school_id"])
    res_rsv = reservations(res_one["school_id"], res_book["isbn"], res_user["user_id"])

    with open("data.sql", "w") as file:
        file.write("USE Library;\n\n")

        file.write("-- School Tables\n\n")
        file.write("".join(res_one["s1"]))
        file.write("".join(res_one["s2"]))
        file.write("".join(res_one["s3"]))
        file.write("".join(res_one["s4"]))

        file.write("\n-- User Tables\n\n")
        file.write("".join(res_user["u1"]))
        file.write("".join(res_user["u2"]))

        file.write("\n-- Book Tables\n\n")
        file.write("".join(res_book["b1"]))
        file.write("".join(res_book["b2"]))
        file.write("".join(res_book["b3"]))

        file.write("\n-- Book_System_Live Tables\n\n")
        file.write("".join(res_reserv["r1"]))

        file.write("\n-- Credentials Tables\n\n")
        file.write("".join(res_creds["c1"]))

        file.write("\n-- Reviews Table\n\n")
        file.write("".join(res_rev["rv1"]))

        file.write("\n-- Registration Table\n\n")
        file.write("".join(res_reg["reg1"]))

        file.write("\n-- Reservation Table\n\n")
        file.write("".join(res_rsv["rsv_q"]))



    

def school_library_query() -> dict:

    '''
        Returns a dictionary with 5 attributes all of type list:

        school_id : list with random school id
        s1 : queries for School_Library
        s2 : queries for School_Library_Phones
        s3 : queries for School_Library_Email
        s4 : queries for School_Library_Admins
        bucket_admin_id : list with admin id
    '''

    print(" [+] Generating School_Library_* dummy data")

    rn = "1234567890"
    h_firstname = ["Evan", "Kate", "John", "Megan", "Irene", "Josh"]
    h_lastname = ["Black", "Brown", "Green", "Red", "Orange", "Blue"]
    city = ["Athens", "Venice", "London", "Madrid", "Prague"]
    street_name = ["cannary St.", "bond St.", "rugby Rd.", "Orange St.", "Apple St.", "Baker St."]
    school_name = ["North School", "West School", "East School", "South School"]

    tb_one = [] # School_Library
    tb_two = [] # School_Library_Phones
    tb_three = [] # School_Library_Email
    tb_four = [] # School_Library_Admins

    track_school_id = []
    track_admin_id = []

    while len(tb_one) != 4:
        school_id = "SC-" + "".join([random.choice(rn) for i in range(5)])
        tmp_school_name = random.choice(school_name) + "#" + "".join([random.choice(rn) for i in range(4)])
        tmp_city = random.choice(city)
        tmp_hfname = random.choice(h_firstname)
        tmp_hlname = random.choice(h_lastname) 
        postal_code = "".join([random.choice(rn) for i in range(5)])
        street_number = "".join([random.choice(rn) for i in range(2)]) 
        tmp_street_name = random.choice(street_name)
        tmp_adm_id = "ADM-" + "".join([random.choice(rn) for i in range(5)])
        tmp_username = "admin_" + "".join([random.choice("abcdefghijklmnopqrtuvwxyz") for i in range(5)])
        tmp_password = "".join([random.choice("abcdefghijklmnopqrtuvwxyz") for i in range(5)]) + "".join([random.choice(rn) for i in range(5)])

        qr = "INSERT INTO School_Library VALUES ('{0}','{1}','{2}','{3}','{4}','{5}', '{6}', '{7}');\n".format(school_id, tmp_school_name, tmp_city, tmp_hfname, tmp_hlname, postal_code, street_number, tmp_street_name)
        qr_adm = "INSERT INTO School_Library_Admins VALUES ('{0}','{1}','{2}','{3}','{4}','{5}');\n".format(tmp_adm_id, school_id, random.choice(h_firstname), random.choice(h_lastname), tmp_username, tmp_password)

        if school_id not in track_school_id and tmp_adm_id not in track_school_id:

            track_admin_id.append(tmp_adm_id)
            track_school_id.append(school_id)

            tb_one.append(qr)
            tb_two.append("INSERT INTO School_Phones VALUES ('{0}', '{1}');\n".format("210-" + "".join([random.choice(rn) for i in range(7)]), school_id))
            tb_three.append("INSERT INTO School_Library_Email VALUES ('{0}', '{1}');\n".format("_".join(tmp_school_name.split(" "))+"@pubschool.com", school_id))
            tb_four.append(qr_adm)

    print(" [+] Done")

    return {"school_id" : track_school_id, "s1" : tb_one, "s2" : tb_two, "s3" : tb_three, "s4" : tb_four, "bucket_admin_id" : track_admin_id}

def user_query(s_bucket : list) -> dict:

    '''
        Given the list with random school id, creates dummy data to fill
        Users and Users_Email table.

        s_bucket : list
        
        user_id : list with created user id
        u1 : queries for Users
        u2 : queries for Users_Email
    '''

    print(" [+] Generating User_* dummy data")

    table = "Users"
    random_firstnames = [ "Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Luna", "Henry", "William", "James", "Benjamin", "Elijah", "Lucas", "Alexander",
    "Avery", "Michael", "Daniel", "Matthew", "Ethan", "Jacob", "Logan", "David", "Samuel", "Joseph",
    "Daniel", "Emily", "Abigail", "Elizabeth", "Sofia", "Scarlett", "Victoria", "Grace", "Chloe", "Natalie"]
    random_lastnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Taylor", "Thomas", "Hernandez", "Moore", "Walker", "Anderson", "White", "Jackson", "Harris", "Clark",
    "Lewis", "Young", "Lee", "Hall", "Wright", "Lopez", "King", "Scott", "Green", "Adams",
    "Baker", "Gonzalez", "Nelson", "Carter", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker"]
    
    id = "USR-"

    role = "student"

    users_tb = []
    users_email_tb = []

    track_academic_id = []
    user_id_bucket = []


    while len(track_academic_id) != 50:

        if len(track_academic_id) > 30:
            role = "instructor"
            availble_borrows = 1
        else:
            role = "student"
            availble_borrows = 2

        s_id = random.choice(s_bucket)
        id = "USR-" + gen_num_seq(5)
        firstname = random.choice(random_firstnames) 
        lastname = random.choice(random_lastnames)
        total_books_borrowed = random.randint(0,50)
        academic_id = "WN-" + "".join([random.choice("1234567890") for i in range(5)])

        if academic_id not in track_academic_id:
            track_academic_id.append(academic_id)
            user_id_bucket.append(id)

            users_tb.append("INSERT INTO {0} VALUES ('{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');\n".format(table, id, s_id, firstname, lastname, random.randint(20,60), role, availble_borrows, total_books_borrowed, 1,academic_id))
            users_email_tb.append("INSERT INTO Users_Email VALUES ('{0}','{1}');\n".format(firstname + "_" + lastname + "".join([random.choice("1234567890") for i in range(2)]) + "@gmail.com", id))

    print(" [+] Done")

    return {"user_id" : user_id_bucket, "u1" : users_tb, "u2" : users_email_tb}

def book_query(school_id_bucket : list) -> dict:

    '''
        Creates the queries for all the book tables.

        Returns a dictionary with the following structure:

        isbn : list with given isbn
        b1 : list with queries for Books
        b2 : list with queries for Book_Categories
        b2 : list with queries for Book_Authors
    '''
    
    print(" [+] Generating Book_* dummy data")

    book_tb = []
    isbn_track = []
    isbn_num = [3,1,2,6,1] # sequence of isbn length between -
    publisher_options = ["Green Editios", "Orange Editions", "Black Editions", "Grey Editions"]

    words = ["Serendipity", "Whimsical", "Enigma", "Journey", "Unveiled", "Echoes", "Luminescence", "Reverie", "Spectrum", "Catalyst",
    "Melancholy", "Enchanted", "Abyss", "Solitude", "Twilight", "Paradigm", "Harmonious", "Quest", "Euphoria", "Ethereal",
    "Cascade", "Amplitude", "Whisper", "Ascend", "Resonance", "Enigma", "Transcend", "Illuminate", "Wanderlust", "Reverence",
    "Enchanting", "Enigmatic", "Luminous", "Vortex", "Essence", "Tranquil", "Evolve", "Harmony", "Serene", "Utopia",
    "Captivate", "Phoenix", "Radiant", "Awakening", "Wanderer", "Nebula", "Miraculous", "Zenith", "Enchant", "Twilight",
    "Ecstasy", "Enthrall", "Odyssey", "Celestial", "Enchanted", "Awe-inspiring", "Cosmos", "Whirlwind", "Spellbound", "Illumination",
    "Infinite", "Reflection", "Symmetry", "Stellar", "Envelop", "Dreamweaver", "Uplift", "Mirage",]

    while len(book_tb) != 100:
        isbn = "-".join([gen_num_seq(i) for i in isbn_num])

        title = random.choice(words) + " " + random.choice(words)
        publisher = random.choice(publisher_options)
        summary = "Sample summary for " + title + " With Regards " + publisher
        pages = random.randint(1,1000)
        copies = random.randint(1,100)


        query = "INSERT INTO Books VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}');\n".format(isbn,random.choice(school_id_bucket), title, publisher, pages, summary, copies)

        if isbn not in isbn_track:
            book_tb.append(query)
            isbn_track.append(isbn)        

    book_categories = ["Fiction","Non-fiction","Mystery","Romance","Science Fiction","Fantasy","Biography","Self-help","History","Thriller"] 


    book_category_tb = []
    book_author_tb = []

    firstname = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Luna", "Henry", "William", "James", "Benjamin", "Elijah", "Lucas", "Alexander"]
    lastname = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Taylor", "Thomas", "Hernandez", "Moore", "Walker", "Anderson", "White", "Jackson", "Harris", "Clark"]

    for _item in isbn_track:
        book_category_tb.append("INSERT INTO Book_Categories(ISBN,Category) VALUES ('{0}','{1}');\n".format(_item, random.choice(book_categories)))

    for _item in isbn_track:
        book_category_tb.append("INSERT INTO Book_Categories(ISBN,Category) VALUES ('{0}','{1}');\n".format(_item, random.choice(book_categories)))
        book_author_tb.append("INSERT INTO Book_Authors(Firstname,Lastname,ISBN) VALUES ('{0}','{1}','{2}');\n".format(random.choice(firstname),random.choice(lastname),_item))

    print(" [+] Done")

    return {"isbn" : isbn_track, "b1" : book_tb, "b2" : book_category_tb, "b3" : book_author_tb}

def credentials(user_id_bucket : list) -> dict:

    '''
        Return a dictionary with the following structure.

        creds_bucket : list with generated creds_id
        c1 : list with queries for Credentials Table
    '''

    print(" [+] Generating Credentials_* dummy data")

    creds_tb = []
    creds_id_track = []

    username_bucket = ["emma", "liam", "olivia", "noah", "ava", "isabella", "sophia", "mia", "charlotte", "amelia",
    "harper", "evelyn", "luna", "henry", "william", "james", "benjamin", "elijah", "lucas", "alexander"]

    usr_index = 0

    while len(creds_tb) != len(user_id_bucket):

        creds_id = "RN-" + gen_num_seq(5)
        tmp_username = random.choice(username_bucket) + "_" + gen_num_seq(4)
        tmp_password = gen_alphabet_seq(5) + "-" + gen_num_seq(4)

        if creds_id not in creds_id_track:
            creds_tb.append("INSERT INTO Credentials VALUES ('{0}','{1}','{2}');\n".format(user_id_bucket[usr_index], tmp_username, tmp_password))
            creds_id_track.append(creds_id)
            usr_index += 1

    print(" [+] Done")

    return {"creds_bucket" : creds_id_track, "c1" : creds_tb}

def registrations(sId_bucket : list) -> dict:

    '''
        Returns a dict with the following structure

        rg_id : list with generated registration id
        reg1 : list wiht queries for Registration Table
    '''

    print(" [+] Generating Registrations_* dummy data")

    register_id_bucket = []
    registrations_tb = []
    academic_id_track = []

    
    firstnames_pool = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Luna", "Henry", "William", "James", "Benjamin", "Elijah", "Lucas", "Alexander"]
    lastnames_pool = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Taylor", "Thomas", "Hernandez", "Moore", "Walker", "Anderson", "White", "Jackson", "Harris", "Clark"]
    user_role = "student"

    username_bucket = ["emma", "liam", "olivia", "noah", "ava", "isabella", "sophia", "mia", "charlotte", "amelia",
    "harper", "evelyn", "luna", "henry", "william", "james", "benjamin", "elijah", "lucas", "alexander"]
    
    

    while len(registrations_tb) != 50:

        if len(registrations_tb) > 30:
            user_role = "instructor"

        rg_id = "RG-" + gen_num_seq(5)
        age = random.randint(19,55)
        tmp_firstname = random.choice(firstnames_pool)
        tmp_lastname = random.choice(lastnames_pool)
        tmp_academic_id = "WN-" + gen_num_seq(5)
        reg_status = "pending"
        tmp_reg_usernmame = random.choice(username_bucket) + "_" + gen_num_seq(4)
        tmp_reg_password = gen_alphabet_seq(5) + "_" + gen_num_seq(5)
        tmp_reg_email = tmp_firstname.lower() + "_" + tmp_lastname.lower() + gen_num_seq(2) + "@gmail.com"

        if rg_id not in register_id_bucket and tmp_academic_id not in academic_id_track:
            register_id_bucket.append(rg_id)
            academic_id_track.append(tmp_academic_id)

            registrations_tb.append("INSERT INTO Registrations VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');\n".format(rg_id, random.choice(sId_bucket), tmp_firstname, tmp_lastname, age, tmp_academic_id, reg_status, user_role, tmp_reg_usernmame, tmp_reg_password, tmp_reg_email))

    print(" [+] Done")

    return {"rg_id" : register_id_bucket, "reg1" : registrations_tb}

def book_system_live(sId_bucket : list, isbn_bucket : list, user_id_bucket : list, admin_id_bucket : list) -> dict:

    '''
        Creates Random Book_Live_System

        Returns a dictionary with the following structure

        book_system_live_id : list with given reservation id
        r1 : queries for Reservations Table
    '''

    print(" [+] Generating Book_System_Live_* dummy data")

    rn = "0123456789"

    bsl_tb = []
    bsl_id_bucket = []
    user_id_used = []

    while len(bsl_tb) != 50:
        late_days = random.randint(0,5)
        bsl_id = "BSL-" + "".join([random.choice(rn) for i in range(5)])
        random_user = random.choice(user_id_bucket)

        if bsl_id not in bsl_id_bucket and random_user not in user_id_used:
            bsl_tb.append("INSERT INTO Book_System_Live(Book_System_Live_id,School_Library_id,ISBN,User_id,Admin_id,Late_Days,Rent_Active) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}');\n".format(bsl_id,random.choice(sId_bucket),random.choice(isbn_bucket), random_user, random.choice(admin_id_bucket),late_days,random.randint(0,1)))

    print(" [+] Done")

    return {"bsl_id" : bsl_id_bucket, "r1" : bsl_tb}

def reviews(user_id_bucket : list, isbn_bucket : list) -> dict:

    '''
        Returns a dict with the following structure

        rv_id : list with generated review_id
        rv1 : list with queries to fill Review Table
    '''
    
    print(" [+] Generating Reviews_* dummy data")

    review_tb = []
    track_rv_id = []

    while len(review_tb) != 50:
        rv_id = "RV-" + gen_num_seq(5)

        if rv_id not in track_rv_id:
            
            track_rv_id.append(rv_id)
            likert_value = random.randint(0,5)
            tmp_isbn = random.choice(isbn_bucket)
            tmp_user_id = random.choice(user_id_bucket)
            review_text = "some review for the book with isbn " + tmp_isbn
            
            review_tb.append("INSERT INTO Reviews VALUES ('{0}','{1}','{2}','{3}','{4}','{5}');\n".format(rv_id, tmp_user_id, tmp_isbn, likert_value, review_text, 0))

    print(" [+] Done")

    return {"rv_id" : track_rv_id, "rv1" : review_tb}


def reservations(sId_bucket : list, isbn_bucket : list, user_id_bucket : list) -> dict:

    '''
        Return a dict with the following structure:

        rsv1 : list with rsv1 id
        rsv_q : list with queries for Reservations Table
    '''

    print(" [+] Generating Reservations_* dummy data")

    rsv_tb = []
    rsv1 = []

    while len(rsv_tb) != 40:
        id ="RSV-" + gen_num_seq(5)
        sc = random.choice(sId_bucket)
        user_id = random.choice(user_id_bucket)
        isbn = random.choice(isbn_bucket)
        rs_date = datetime.datetime.now().__str__().split(" ")[0]
        rs_status = random.randint(0,1)

        if id not in rsv1:
            rsv1.append(id)
            rsv_tb.append("INSERT INTO Reservations VALUES('{0}','{1}','{2}','{3}','{4}','{5}');\n".format(id,sc,user_id,isbn,rs_date,rs_status))

    print(" [+] Done")

    return {"rsv1" : rsv1, "rsv_q" : rsv_tb}


def gen_num_seq(x : int) -> str:
    
    pool = "0123456789"
    return "".join([random.choice(pool) for i in range(x)])

def gen_alphabet_seq(x : int) -> str:
    
    pool = "abcdefghijklmnopqrtsuvwxyz"
    return "".join([random.choice(pool) for i in range(x)])


if __name__ == "__main__":
    main()