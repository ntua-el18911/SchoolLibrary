import { useState,useEffect } from "react";
import Notification from "./Notification";
import Cookies from "js-cookie";

function BooksHistory() {


    const [booksHistoryBucket,setBooksHistoryBucket] = useState([]);
    const [user,setUser] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);

    async function fetchBooksHistory() {

        const url = "http://localhost:9000/api/bookhistory";
        const cookie = JSON.parse(Cookies.get("id"));
        const params = {
            user_id : cookie.User_id
        };

        try{
            const res = await fetch(url, {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(params)
            })

            const data = await res.json();
            
            if (res.status === 404){
                
                setNothingFound(true);
            } else {
                setBooksHistoryBucket(data.book_history);
                
            }

            setUser(cookie);
        
        } catch(error) {
            setNotificationError(true);
        }
    }

    useEffect(() => {
        fetchBooksHistory();
    },[]);

    return (
        <div className="pl-4 flex justify-center">
            {notificationError && <Notification notificationTitle={"Failed to load your Books"} notificationMsg={"An Unexpected Error Occured while loading your books."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            
            {
                nothingFound && 
                    <p className="text-lg text-center">No active book history found.</p>
            }

            {nothingFound===false &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Books History</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>Index</th>
                                <th className={"border p-4 border-black"}>ISBN</th>
                                <th className={"border p-4 border-black"}>Title</th>
                                <th className={"border p-4 border-black"}>Firstname</th>
                                <th className={"border p-4 border-black"}>Lastname</th>
                                <th className={"border p-4 border-black"}>Start Date</th>
                                <th className={"border p-4 border-black"}>End Date</th>
                            </tr>
                            </thead>
                            <tbody>

                                { 
                                    booksHistoryBucket!==undefined && booksHistoryBucket.map((item,index) => {
                                        return (
                                            <tr key={item.ISBN}>
                                                <td className={"border p-2 border-black"}>{index+1}</td>
                                                <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                <td className={"border p-2 border-black hover:cursor-pointer"}>{item.Title}</td>
                                                <td className={"border p-2 border-black"}>{item.Firstname}</td>
                                                <td className={"border p-2 border-black"}>{item.Lastname}</td>
                                                <td className={"border p-2 border-black"}>{item.Start_Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>{item.End_Date.split("T")[0]}</td> 
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                </table>}
        </div>
    )
}

export default BooksHistory;