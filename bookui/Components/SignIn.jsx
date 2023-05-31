import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const router = useRouter();
    
    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    
    function handleSignIn() {
        //TODO add 
        router.push("/dashboard")
    }
    
    return (
        <div className="box-border h-auto w-96 border-2 border-black rounded mx-auto mt-16 p-8 shadow-xl">
        <h1 className="text-center text-xl mb-4">Sign In To School Library</h1>
        
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