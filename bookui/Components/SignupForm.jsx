import Link from "next/link";
import { useEffect, useState } from "react";
import Notification from "./Notification";

function SignupForm() {

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [age,setAge] = useState("");
    const [academicID, setAcademicID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [schoolId,setSchoolId] = useState("");
    const [schools,setSchools] = useState([]);
    const [notify,setNotify] = useState(false);
    const [errorNotification,setErrorNotification] = useState(false);

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

    function handleChangeSchoolId(event) {
        setSchoolId(event.target.value);
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    
    async function handleClick() {
        const url = "http://localhost:9000/api/signup";

        //TODO verify fields

        const new_user = {
            school_id : schoolId,
            firstname : firstname,
            lastname : lastname,
            age : age,
            email, email,
            academic_id : academicID,
            role : role,
            username : username,
            password : password
        }

        try {
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(new_user)
            })

            if (response.status === 200) {
                setNotify(true);
            }
        } catch(error) {
            console.error(error);
            setErrorNotification(true);
        }
    }

    async function getSchools() {
        
        const url = "http://localhost:9000/api/schools";
        
        try{
            const response = await fetch(url, {
                method : "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            });

            const sc = await response.json();
            setSchools(sc.data);
        } catch(error) {
            console.error(error);
            setErrorNotification(true);
        }
    }

    useEffect(() => {
        getSchools();
    },[]);

    return (
        <div className="box-border h-auto w-2/5 border-2 border-black rounded mx-auto mt-8 p-8 shadow-xl">
            
            {notify && <Notification notificationTitle={"Request Success"} notificationMsg={"You will be notified with an email when your registration is approved"} notificationInfo={"success"} setVisibleNotification={setNotify}/>}
            {errorNotification && <Notification notificationTitle={"Request Failure"} notificationMsg={"Your request contains errors, fix them to proceed."} notificationInfo={"errors"} setVisibleNotification={setErrorNotification}/>}
            
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

            <select className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4"
                    onChange={handleChangeRole}>
                <option value={"default"} selected>Select Your Role</option>
                <option value={"student"}>Student</option>
                <option value={"instructor"}>Instructor</option>
            </select>

            <select className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4"
                    onChange={handleChangeSchoolId}>
                <option value={"default"} selected>Select Your School</option>
                {schools.map((data) => {
                    return <option key={data.id} value={data.id}>{data.name}</option>
                })}
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