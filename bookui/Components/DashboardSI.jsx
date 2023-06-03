/*
    Dashboard for Student and Instructor.
*/

import { useEffect, useState } from "react";
import BooksUserTable from "./BooksUserTable";
import MenuBarSI from "./MenuBarSI";
import { useRouter } from "next/router";
import Notification from "./Notification";
import Cookies from "js-cookie";

export default function DashboardSI() {

    const router = useRouter();
    const [user,setUser] = useState({"Firstname":"some","Lastname":"any","Available_Borrows":1,"Total_Books_Borrowed":1});
    const [notificationError,setNotificationError] = useState(false);

   useEffect(() => {
    const cookie = JSON.parse(Cookies.get("id"));
    setUser(cookie);
   },[]); 

    return (
        <div>
            {notificationError && <Notification notificationTitle={"Something Unexpected happened"} notificationMsg={"Please try again later."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            <MenuBarSI page={router.pathname}/>
            <BooksUserTable user={user}/>
        </div>
    )
}