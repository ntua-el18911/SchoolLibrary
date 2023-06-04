import { useEffect, useState } from "react";
import AdminBookSearchBar from "./AdminBookSearchBar";
import Cookies from "js-cookie";
import Notification from "./Notification";

function AdminBookTable ({user}) {

    const [notificationsBookError,setNotificationBookError] = useState(false);
    const [completeBooks,setCompleteBooks] = useState([]);
    const [selectedBooks,setSelectedBooks] = useState([]);


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

    useEffect(()=> {
        getBooks();
    },[]);


    return (
        <div className="pl-4">
            <h1 className="text-center text-2xl mt-2">Admin Dashboard</h1>
            <div className="mt-4">
                <label className={"pl-2 text-2xl"}>Admin: {user.Firstname}</label>
                <label className={"pl-2 text-2xl"}>{user.Lastname}</label><br/>
            </div>
            
            {notificationsBookError && <Notification notificationTitle={"Book Data Load Failure"} notificationMsg={"An Unexpected Error Occured while loading books or Stats."} notificationInfo={"errors"} setVisibleNotification={setNotificationBookError}/>}
            <AdminBookSearchBar books={completeBooks} setFilteredBooks={setSelectedBooks}/>  
         
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
                                selectedBooks.map((item,index) => {
                                    return (
                                        <tr key={index} sc={item.School_Library_id} isbn={item.ISBN} tl={item.Title}>
                                            <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                            <td className={"border p-2 border-black"}>{item.Title}</td>
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

export default AdminBookTable;