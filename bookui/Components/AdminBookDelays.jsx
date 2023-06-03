import { useState,useEffect } from "react";
import Notification from "./Notification";


function AdminBookDelays() {


    const [bookDelays,setBookDelays] = useState([]);
    const [filteredBookDelays,setFilteredBookDelays] = useState([]);
    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);
    const [Firstname,setFirstname] = useState();
    const [Lastname,setLastname] = useState();
    const [lateDays,setLateDays] = useState();

    async function fetchBookDelays() {

        const url = "http://localhost:9000/api/admin/bookdelays";

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
                setBookDelays(data.delays);
                setFilteredBookDelays(data.delays);
            }
        } catch(error) {
            console.log(error);
            setNotificationError(true);
            setNothingFound(true);
        }
    }

    function handleSearch() {
        setFilteredBookDelays(bookDelays.filter(item=>{
            return item.Firstname === Firstname || item.Lastname === Lastname || item.Late_Days === parseInt(lateDays);
        }));
    }

    useEffect(() => {
        fetchBookDelays();
    },[]);

    return (
        <div className="pl-4 flex justify-center space-x-4">
            <div>
                <h1 className="text-center text-2xl mt-2">Admin Book Delays</h1>
                {notificationError && <Notification notificationTitle={"Book Delays Load Failure"} notificationMsg={"An Unexpected Error Occured while loading book delays."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            
                {
                    nothingFound && 
                        <p className="text-lg text-center">No book delays found.</p>
                }

                {nothingFound===false &&
                    <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                        <caption className={"caption-top mb-2 text-lg font-medium"}>Book Delays</caption>
                            <thead>
                                <tr className={"bg-white"}>
                                    <th className={"border p-4 border-black"}>ISBN</th>
                                    <th className={"border p-4 border-black"}>Title</th>
                                    <th className={"border p-4 border-black"}>Academic ID</th>
                                    <th className={"border p-4 border-black"}>Firstname</th>
                                    <th className={"border p-4 border-black"}>Lastname</th>
                                    <th className={"border p-4 border-black"}>Start Date</th>
                                    <th className={"border p-4 border-black"}>End Date</th>
                                    <th className={"border p-4 border-black"}>Days Late</th>
                                </tr>
                                </thead>
                                <tbody>

                                    { 
                                        filteredBookDelays.map(item => {
                                            return (
                                                <tr key={item.ISBN} data-key={item.ISBN}>
                                                    <td className={"border p-2 border-black"}>{item.ISBN}</td>
                                                    <td className={"border p-2 border-black"}>{item.Title}</td>
                                                    <td className={"border p-2 border-black"}>{item.Academic_id}</td>
                                                    <td className={"border p-2 border-black"}>{item.Firstname}</td>
                                                    <td className={"border p-2 border-black"}>{item.Lastname}</td>
                                                    <td className={"border p-2 border-black"}>{item.Start_Date.split("T")[0]}</td> 
                                                    <td className={"border p-2 border-black"}>{item.End_Date.split("T")[0]}</td>
                                                    <td className={"border p-2 border-black"}>{item.Late_Days}</td>
                                                </tr>
                                            )
                                        })
                                    }
                            </tbody>
                    </table>}
                </div>
                <div className="box-border h-fit w-fit border-2 border-black rounded mt-14 p-8 shadow-xl mt-24">
                    <h1 className="text-center text-xl mb-4">Search </h1>
                    <input 
                        type="text" 
                        className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                        placeholder="Firstname"
                        onChange={(event) => setFirstname(event.target.value)}
                    />

                    <input 
                        type="text" 
                        className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                        placeholder="Lastname"
                        onChange={(event) => setLastname(event.target.value)}
                    />      

                    <input 
                        type="number" 
                        className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                        placeholder="Delay Days"
                        onChange={(event) => setLateDays(event.target.value)}
                    />

                    <div className="flex space-x-4">

                        <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                            onClick={handleSearch}>Search</button>

                        <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                            onClick={() => {setFilteredBookDelays(bookDelays)}}>Show All</button>
                </div>
            </div>
        </div>
    )
}

export default AdminBookDelays;