import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Notification from "./Notification";

function UserReservations() {


    const [reservations,setReservations] = useState([]);
    const [user,setUser] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);
    const [addSuccessNotification,setAddSuccessNotification] = useState(false);
    const [addFailNotification,setAddFailNotification] = useState(false);
    const [denySuccessNotification,setDenySuccessNotification] = useState(false);
    const [denyFailNotification,setDenyFailNotification] = useState(false);
    const [addRemoveNotification,setAddRemoveNotification] = useState(false);

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

    async function handleApprove(event) {

        const schoool_id = event.currentTarget.parentNode.getAttribute("data-sid");
        const isbn = event.currentTarget.parentNode.getAttribute("data-isbn");
        const user_id = event.currentTarget.parentNode.getAttribute("data-uid");
        const reservation_id = event.currentTarget.parentNode.getAttribute("data-rid"); 

        const url_add = "http://localhost:9000/api/admin/addbook"
        const url_remove_reservation = "http://localhost:9000/api/admin/deletereservation";

        const params_add = {
            school_id: schoool_id,
            isbn: isbn,
            user_id: user_id,
            admin_id: user.Admin_id 
        }

        const params_remove = {
            id : reservation_id
        }

        try {
            const res = await fetch(url_add, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(params_add)
            })

            if (res.status !== 200) {
                setAddFailNotification(true);
                return;
            }
        } catch(error) {
            setAddFailNotification(true);
            return;
        }

        try {
            const res_delete = await fetch(url_remove_reservation, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(params_remove)
            });

            if (res_delete.status === 200) {
                setAddSuccessNotification(true);
                setReservations(reservations.filter(item => {
                    return item.Reservations_id !== reservation_id
                }));
            } else {
                setAddRemoveNotification(true);
            }

        } catch(error) {
            console.log(error);
            setAddRemoveNotification(true);
        }
    }

    async function handleDeny(event) {
       
        const reservation_id = event.currentTarget.parentNode.getAttribute("data-rid"); 

        const url_remove_reservation = "http://localhost:9000/api/admin/deletereservation";

        const params_remove = {
            id : reservation_id
        }

        try {
            const res_delete = await fetch(url_remove_reservation, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(params_remove)
            });

            if (res_delete.status === 200) {
                setDenySuccessNotification(true);
                setReservations(reservations.filter(item => {
                    return item.Reservations_id !== reservation_id
                }));
            } 

        } catch(error) {
            console.log(error);
            setDenyFailNotification(true);
        }
    }

    useEffect(() => {
        fetchReservations();
    },[]);

    return (
        <div className="pl-4 flex justify-center">

            {notificationError && <Notification notificationTitle={"Reservations Load Failure"} notificationMsg={"An Unexpected Error Occured while loading  reservations."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            {addSuccessNotification && <Notification notificationTitle={"Reservation Approved"} notificationMsg={"Reservation has been successfully approved."} notificationInfo={"success"} setVisibleNotification={setAddSuccessNotification}/>}
            {addFailNotification && <Notification notificationTitle={"Reservations Failed To Approve"} notificationMsg={"An Unexpected Error Occured while approving reservation."} notificationInfo={"errors"} setVisibleNotification={setAddFailNotification}/>}
            {denySuccessNotification && <Notification notificationTitle={"Reservations Rejected Successfully"} notificationMsg={"Reservation has been rejected successfully."} notificationInfo={"success"} setVisibleNotification={setDenySuccessNotification}/>}
            {denyFailNotification && <Notification notificationTitle={"Reservations Rejection Failure"} notificationMsg={"An Unexpected Error Occured while rejecting reservation."} notificationInfo={"errors"} setVisibleNotification={setDenyFailNotification}/>}
            {addRemoveNotification && <Notification notificationTitle={"Reservation Remove Failure"} notificationMsg={"Reservation has been approved but couldn't be deleted."} notificationInfo={"errors"} setVisibleNotification={setAddRemoveNotification}/>}

            {
                nothingFound && 
                    <p className="text-lg text-center">No reservations were found.</p>
            }

            {nothingFound===false &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Reservations</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>Index</th>
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
                                    reservations !== undefined && reservations.map((item,index) => {
                                        return (
                                            <tr key={index} data-key={item.ISBN}>
                                                <td className={"border p-2 border-black"}>{index+1}</td>
                                                <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                <td className={"border p-2 border-black"}>{item.Title}</td>
                                                <td className={"border p-2 border-black"}>{item.Date.split("T")[0]}</td>
                                                <td className={"border p-2 border-black"}>{item.Firstname}</td>
                                                <td className={"border p-2 border-black"}>{item.Lastname}</td>
                                                <td className={"border p-2 border-black"}>Pending</td> 
                                                <td className={"border p-2 border-black flex justify-center"}
                                                    data-isbn={item.ISBN}
                                                    data-sid={item.School_Library_id}
                                                    data-rid={item.Reservations_id}
                                                    data-uid={item.User_id}>
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