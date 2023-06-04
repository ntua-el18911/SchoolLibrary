import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";

function UserReservations() {


    const [reservations,setReservations] = useState([]);
    const [user,setUser] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);
    const [deleteNotificationError,setDeleteNotificationError] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);

    async function fetchReservations() {

        const url = "http://localhost:9000/api/reservations";
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
                setReservations(data.reservations);
            }

            setUser(cookie);
        
        } catch(error) {
            setNotificationError(true);
        }
    }

    async function handleDeny(event) {

        const key = event.currentTarget.getAttribute("key-id");
        const rs_id = event.currentTarget.getAttribute("rs-id"); 
        const params = {
            reservation_id : rs_id
        }

        try {
            const url = "http://localhost:9000/api/cancelreservation";

            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(params)
            })

            if (res.status === 200) {
                setSuccessNotification(true); 
                setReservations(reservations.filter(item => {
                    return item.ISBN !== key;
                }));
            } else {
                setDeleteNotificationError(true); 
            }

        } catch(error) {
            setDeleteNotificationError(true);
        }

    }

    useEffect(() => {
        fetchReservations();
    },[]);

    return (
        <div className="pl-4 flex justify-center">
            {notificationError && <Notification notificationTitle={"Reservations Load Failure"} notificationMsg={"An Unexpected Error Occured while loading  reservations."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            {deleteNotificationError && <Notification notificationTitle={"Reservation Cancel Failure"} notificationMsg={"An Unexpected Error Occured while cancelling your reservation."} notificationInfo={"errors"} setVisibleNotification={setDeleteNotificationError}/>}
            {successNotification && <Notification notificationTitle={"Reservation Canceled Successfully"} notificationMsg={"Your reservation has been successfully canceled"} notificationInfo={"success"} setVisibleNotification={setSuccessNotification}/>}


            {
                nothingFound && 
                    <p className="text-lg text-center">No reservations were found.</p>
            }

            {nothingFound===false && reservations !== undefined &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Reservations</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>Index</th>
                                <th className={"border p-4 border-black"}>ISBN</th>
                                <th className={"border p-4 border-black"}>Title</th>
                                <th className={"border p-4 border-black"}>Date</th>
                                <th className={"border p-4 border-black"}>Status</th>
                                <th className={"border p-4 boder-black"}>Cancel</th>
                            </tr>
                            </thead>
                            <tbody>

                                { 
                                    reservations !== undefined && reservations.map((item,index) => {
                                        return (
                                            <tr key={item.ISBN}>
                                                <td className={"border p-2 border-black"}>{index+1}</td>
                                                <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                <td className={"border p-2 border-black hover:cursor-pointer"}>{item.Title}</td>
                                                <td className={"border p-2 border-black"}>{item.Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>Pending</td>
                                                <td className={"border p-2 border-black"}>
                                                    <span 
                                                        key-id={item.ISBN} 
                                                        rs-id={item.Reservations_id}
                                                        className="hover:cursor-pointer flex justify-center"
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