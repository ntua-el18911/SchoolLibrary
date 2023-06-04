import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";

function AdminLiveSystem() {

    const [systemLiveBooks,setSystemLiveBooks] = useState([]);
    const [user,setUser] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);
    const [bookReturnSuccess,setBookReturnSuccess] = useState(false);
    const [bookReturnFail,setBookReturnFail] = useState(false);

    async function fetchBookLiveSystem() {

        const url = "http://localhost:9000/api/admin/getlivesystem";
        const cookie = JSON.parse(Cookies.get("id"));

        try{
            const res = await fetch(url, {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            })

            const data = await res.json();
            
            if (res.status === 404){
                
                setNothingFound(true);
            } else {
                setSystemLiveBooks(data.live_activity);
            }

            setUser(cookie);
        
        } catch(error) {
            setNotificationError(true);
            setNothingFound(true);
        }
    }

    async function handleBookReturn(event) {

        const book_live_id = event.currentTarget.getAttribute("key-id");
        const url = "http://localhost:9000/api/admin/bookreturn";

        const params = {
            id : book_live_id
        }

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(params)
            });

            if (res.status === 200) {
                setBookReturnSuccess(true);
                setSystemLiveBooks(systemLiveBooks.filter(item => {
                    return item.Book_System_Live_id !== book_live_id;
                }))
            } else {
                setBookReturnFail(true);
            }

        } catch(error) {
            setBookReturnFail(true);
        }
        
    }


    useEffect(() => {
        fetchBookLiveSystem();
    },[]);

    return (
        <div className="pl-4 flex justify-center">

            {notificationError && <Notification notificationTitle={"Registrations Load Failure"} notificationMsg={"An Unexpected Error Occured while loading registrations."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            {bookReturnSuccess && <Notification notificationTitle={"Book Return Complete"} notificationMsg={"Book Return Completed Successfully."} notificationInfo={"success"} setVisibleNotification={setBookReturnSuccess}/>}
            {bookReturnFail && <Notification notificationTitle={"Book Return Fail"} notificationMsg={"An Unexpected Error Occured while making the return."} notificationInfo={"errors"} setVisibleNotification={setBookReturnFail}/>}


            {
                nothingFound && 
                    <p className="text-lg text-center">No Book Activity found.</p>
            }

            {nothingFound===false &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Live Book Activity</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>Index</th>
                                <th className={"border p-4 border-black"}>ISBN</th>
                                <th className={"border p-4 border-black"}>Title</th>
                                <th className={"border p-4 border-black"}>Library</th>
                                <th className={"border p-4 border-black"}>Name</th>
                                <th className={"border p-4 border-black"}>Academic ID</th>
                                <th className={"border p-4 border-black"}>Admin</th>
                                <th className={"border p-4 border-black"}>Late Days</th>
                                <th className={"border p-4 border-black"}>Start Date</th>
                                <th className={"border p-4 border-black"}>End Date</th>
                                <th className={"border p-4 border-black"}>Return</th>
                            </tr>
                            </thead>
                            <tbody>

                                { 
                                    systemLiveBooks !== undefined && systemLiveBooks.map((item,index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={"border p-2 border-black"}>{index+1}</td>
                                                <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                <td className={"border p-2 border-black"}>{item.Title}</td>
                                                <td className={"border p-2 border-black"}>{item.School_Name}</td>
                                                <td className={"border p-2 border-black"}>{item.User_Firstname + " " + item.User_Lastname}</td>
                                                <td className={"border p-2 border-black"}>{item.Academic_id}</td> 
                                                <td className={"border p-2 border-black"}>{item.Admin_Firstname + " " + item.Admin_Lastname}</td>
                                                <td className={"border p-2 border-black"}>{item.Late_Days}</td>
                                                <td className={"border p-2 border-black"}>{item.Start_Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>{item.End_Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>
                                                    <span
                                                        key-id={item.Book_System_Live_id}
                                                        className="hover:cursor-pointer flex justify-center"
                                                        onClick={handleBookReturn}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" stroke-line="true" join="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                </table>}
        </div>
    )
}

export default AdminLiveSystem;