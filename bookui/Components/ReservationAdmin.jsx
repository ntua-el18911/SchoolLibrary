import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";

function UserReservations() {


    const [reservations,setReservations] = useState([]);
    const [user,setUser] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);

    async function fetchReservations() {

        const url = "http://localhost:9000/api/admin/reservations";
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
                setReservations(data.reservations);
                
            }

            setUser(cookie);
        
        } catch(error) {
            console.log(error);
            setNotificationError(true);
            setNothingFound(true);
        }
    }

    function handleApprove() {
        alert("clicked");
    }

    function handleDeny() {
        //TODO
    }

    useEffect(() => {
        fetchReservations();
    },[]);

    return (
        <div className="pl-4">

            <h1 className="text-center text-2xl mt-2">Admin Reservations</h1>
            {notificationError && <Notification notificationTitle={"Reservations Load Failure"} notificationMsg={"An Unexpected Error Occured while loading  reservations."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            
            {
                nothingFound && 
                    <p className="text-lg text-center">No reservations were found.</p>
            }

            {nothingFound===false &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Reservations</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>ISBN</th>
                                <th className={"border p-4 border-black"}>Title</th>
                                <th className={"border p-4 border-black"}>Date</th>
                                <th className={"border p-4 border-black"}>Firstname</th>
                                <th className={"border p-4 border-black"}>Lastname</th>
                                <th className={"border p-4 border-black"}>Status</th>
                                <th className={"border p-4 border-black"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                                { 
                                    reservations.map(item => {
                                        return (
                                            <tr key={item.ISBN} data-key={item.ISBN}>
                                                <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                <td className={"border p-2 border-black hover:cursor-pointer"}>{item.Title}</td>
                                                <td className={"border p-2 border-black"}>{item.Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>{item.Firstname}</td>
                                                <td className={"border p-2 border-black"}>{item.Lastname}</td>
                                                <td className={"border p-2 border-black"}>Pending</td> 
                                                <td className={"border p-2 border-black flex justify-center"}>
                                                    <span 
                                                        className="hover:cursor-pointer"
                                                        onClick={handleApprove}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" stroke-line="true" join="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                    <span 
                                                        className="hover:cursor-pointer"
                                                        onClick={handleDeny}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" stroke-line="true" join="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

export default UserReservations;