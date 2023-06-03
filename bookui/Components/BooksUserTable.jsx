import { useEffect, useState } from "react";
import BookUserSearchBar from "./BookUserSearchBar";
import BookReservation from "./BookReservation";
import Cookies from "js-cookie";
import Notification from "./Notification";

function BooksUserTable ({user}) {

    const [notificationsBookError,setNotificationBookError] = useState(false);
    const [completeBooks,setCompleteBooks] = useState([]);
    const [selectedBooks,setSelectedBooks] = useState([]);
    const [bookReservationVisible,setBookReservationVisible] =useState(false);
    const [isbn,setIsbn] = useState();
    const [school_id,setSchool_id] = useState();
    const [title,setTitle] = useState();
    const [available_books,setAvailableBooks] = useState();
    const [total_books,setTotalBooks] = useState();
    const [cookieData,setCookieData] = useState();

    const [completeReservation, setCompleteReservation] = useState(false);
    const [failedReservation, setFailedReservation] = useState(false);
    const [unavailableBook, setUnavailableBook] = useState(false);
    const [reservationExists, setReservationExists] = useState(false);
    const [reservationForbidden, setReservasitionForbidden] = useState(false);

    async function getBooks() {

        const url_books = "http://localhost:9000/api/getbooks";

        try {
            const response_books= await fetch(url_books, {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response_books.json();
            setSelectedBooks(data.books);
            setCompleteBooks(data.books);
        } catch(error) {
            console.error(error);
            setNotificationBookError(true);
        }
    }

    async function getStats() {
        
        const url = "http://localhost:9000/api/getuser";
        const cookie = JSON.parse(Cookies.get("id"));
        const params = {
            user_id : cookie.User_id
        };

        try {
            const user_stats = await fetch(url, {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(params)
            });

            const data = await user_stats.json();
            if (user_stats.status === 200) {
                setAvailableBooks(data.user.Available);
                setTotalBooks(data.user.Total);
            }
            setCookieData(cookie);
        } catch(error) {
            console.error(error);
            setNotificationBookError(true);
        }

    }


    useEffect(()=> {
        getBooks();
        getStats();
    },[]);


    return (
        <div className="pl-4">

            <div className="mt-4">
                <label className={"pl-2 text-2xl"}>{user.Firstname}</label>
                <label className={"pl-2 text-2xl"}>{user.Lastname}</label><br/>
            </div>
            <div className="">
                <label className={"pl-2 text-2xl"}>Available Borrows: {available_books}</label>
                <label className={"pl-2 text-2xl"}>Total Borrows: {total_books}</label>
            </div>
            {notificationsBookError && <Notification notificationTitle={"Book Data Load Failure"} notificationMsg={"An Unexpected Error Occured while loading books or Stats."} notificationInfo={"errors"} setVisibleNotification={setNotificationBookError}/>}
            <BookUserSearchBar books={completeBooks} setFilteredBooks={setSelectedBooks}/>  
            {bookReservationVisible && <BookReservation 
                                            title={title} 
                                            user_id={user.User_id} 
                                            isbn={isbn} 
                                            school_id={school_id} 
                                            setBookReservationVisible={setBookReservationVisible}
                                            setCompleteReservation={setCompleteReservation}
                                            setFailedReservation={setFailedReservation}
                                            setUnavailableBook={setUnavailableBook}
                                            setReservationExists={setReservationExists}
                                            setReservationForbidden={setReservasitionForbidden}
                                            />}

            {completeReservation && <Notification notificationTitle={"Reservation Complete"} notificationMsg={"Your Reservation has been successfully completed"} notificationInfo={"success"} setVisibleNotification={setCompleteReservation}/>}
            {unavailableBook && <Notification notificationTitle={"Reservation Fail"} notificationMsg={"Book is currently unavailable"} notificationInfo={"info"} setVisibleNotification={setUnavailableBook}/>}
            {failedReservation && <Notification  notificationTitle={"Reservation Fail"} notificationMsg={"An Unexpected Error Occured"} notificationInfo={"errors"} setVisibleNotification={setFailedReservation}/>}
            {reservationExists && <Notification  notificationTitle={"Reservation Fail"} notificationMsg={"We already have a reservation for this book"} notificationInfo={"info"} setVisibleNotification={setReservationExists}/>}       
            {reservationForbidden && <Notification  notificationTitle={"Reservation Fail"} notificationMsg={"You can't create more reservations."} notificationInfo={"errors"} setVisibleNotification={setReservasitionForbidden}/>}

            <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                <caption className={"caption-top mb-2 text-lg font-medium"}>Books</caption>
                    <thead>
                        <tr className={"bg-white"}>
                            <th className={"border p-4 border-black"}>ISBN</th>
                            <th className={"border p-4 border-black"}>Title</th>
                            <th className={"border p-4 border-black"}>Categories</th>
                            <th className={"border p-4 border-black"}>Author</th>
                            <th className={"border p-4 border-black"}>School Library</th>
                            <th className={"border p-4 border-black"}>Publisher</th>
                            <th className={"border p-4 border-black"}>Page Number</th>
                            <th className={"border p-4 border-black"}>Available Copies</th>
                        </tr>
                        </thead>
                        <tbody>

                            {
                                selectedBooks.map(item => {
                                    return (
                                        <tr key={item.ISBN} sc={item.School_Library_id} isbn={item.ISBN} tl={item.Title}>
                                            <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                            <td className={"border p-2 border-black hover:cursor-pointer"}
                                                onClick={(event) => {
                                                        setIsbn(event.currentTarget.parentNode.getAttribute("isbn"));
                                                        setSchool_id(event.currentTarget.parentNode.getAttribute("sc"));                                                        
                                                        setTitle(event.currentTarget.parentNode.getAttribute("tl"));
                                                        setBookReservationVisible(true)
                                                    }
                                                }>{item.Title}</td>
                                            <td className={"border p-2 border-black"}>{item.Book_Category}</td>
                                            <td className={"border p-2 border-black"}>{item.Author}</td>
                                            <td className={"border p-2 border-black"}>{item.School_Name}</td>
                                            <td className={"border p-2 border-black"}>{item.Publisher}</td>
                                            <td className={"border p-2 border-black"}>{item.Page_Number}</td>
                                            <td className={"border p-2 border-black"}>{item.Copies}</td>    
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                </table> 
        </div>
    )
}

export default BooksUserTable;