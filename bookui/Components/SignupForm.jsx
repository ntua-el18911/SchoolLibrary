import Link from "next/link";
import { useState } from "react";

function SignupForm() {

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [age,setAge] = useState("");
    const [academicID, setAcademicID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeFirstname(event) {
        setFirstname(event.target.value);
    }

    function handleChangeLastname(event) {
        setLastname(event.target.value);
    }

    function handleChangeAge(event) {
        setAge(event.target.value);
    }

    function handleChangeAcademicID(event) {
        setAcademicID(event.target.value);
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangeRole(event) {
        setRole(event.target.value);
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    
    async function handleClick() {
        
    }

    return (
        <div className="box-border h-auto w-96 border-2 border-black rounded mx-auto mt-16 p-8 shadow-xl">

            <h1 className="text-center text-xl mb-4">Sign Up For SchoolLibrary</h1>

            <input 
                type="text" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
                placeholder="Firstname"
                onChange={handleChangeFirstname}
            />

           <input 
                type="text" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
                placeholder="Lastname"
                onChange={handleChangeLastname}
            />

            <input 
                type="number" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
                placeholder="Age"
                onChange={handleChangeAge}
            />

            <input 
                type="text" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
                placeholder="Academic ID"
                onChange={handleChangeAcademicID}
            />

            <input 
                type="email" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4" 
                placeholder="Email"
                onChange={handleChangeEmail}
            />

            <select className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4" defaultValue={"student"}>
                <option value={"student"}>Student</option>
                <option value={"instructor"}>Instructor</option>
            </select>

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
                className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                onClick={handleClick}>
                Sign Up
            </button>
            
            <br/>
            <Link href="/" className="text-lg text-center hover:cursor-pointer hover:text-blue-500">Already have an account? Sign In</Link>
            
            
        </div>
    )
}

export default SignupForm;