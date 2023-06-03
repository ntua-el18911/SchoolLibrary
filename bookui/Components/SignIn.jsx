import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Notification from "./Notification";
import Cookies from "js-cookie";

export default function SignIn() {

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [notificationError,setNotificationError] = useState(false);
    const router = useRouter();
    
    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    
    async function handleSignIn() {
        
        const user_obj = {
            username : username,
            password : password
        }

        const url = "http://localhost:9000/api/signin"

        const resp = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user_obj)
            }
        )

        const resp_info = await resp.json();
        Cookies.set("id",JSON.stringify(resp_info.user), {expires: 1});

        if (resp.status === 200) {
            if ("User_Role" in resp_info.user) {
                router.push(`/dashboard`);
            } else {
                if ("Admin_id" in resp_info.user) {
                    router.push(`/admin/dashboard`);
                }
            }
        } else {
            setNotificationError(true);
        }
        
    }
    
    return (
    <div className="box-border h-auto w-96 border-2 border-black rounded mx-auto mt-16 p-8 shadow-xl">
        <h1 className="text-center text-xl mb-4">Sign In To School Library</h1>
        
        {notificationError && <Notification notificationTitle={"Invalid Credentials"} notificationMsg={"Your username or password are incorrect."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}

        <input 
            type="text" 
            className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
            placeholder="Username"
            onChange={handleChangeUsername}
        />

        <input 
            type="password" 
            className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
            placeholder="Password"
            onChange={handleChangePassword}
        />

        <button 
            className="mb-4 border-2 border-black rounded-lg p-4 w-24 h-14 hover:shadow-xl hover:text-white hover:bg-black"
            onClick={handleSignIn}>
            Sign In
        </button>

        <br />

        <Link 
            href="/signup" 
            className="hover:shadow-xl hover:cursor-pointer hover:text-blue-400">
                Don't have an Account? Sign Up here
        </Link>
    </div>
    );
}