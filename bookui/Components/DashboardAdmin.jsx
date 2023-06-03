import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import MenuBarAdmin from "./MenuBarAdmin";
import Notification from "./Notification";
import AdminBookTable from "./AdminUserTable";
import Cookies from "js-cookie";

function DashboardAdmin() {
    
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
            <MenuBarAdmin page={router.pathname} />
            <AdminBookTable user={user}/>
        </div>
    )
}

export default DashboardAdmin;