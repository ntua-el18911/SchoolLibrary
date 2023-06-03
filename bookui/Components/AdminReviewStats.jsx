import Notification from "./Notification";
import { useState,useEffect } from "react";


function AdminReviewStats() {

    const [notificationError,setNotificationError] = useState(false);
    const [nothingFound,setNothingFound] = useState(false);
    const [reviewStats, setReviewStats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState();
    const [firstname,setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [filterReviewStats,setFilterReviewStats] = useState([]);

    async function getReviewsPending() {

    }

    async function getCategories() {
        
        const url = "http://localhost:9000/api/getcategories"

        try {
            const res= await fetch(url, {
                method: "GET",
                headers : {
                "Content-Type" : "application/json"
                }
            });

            const data = await res.json();
            setCategories(data.categories);
        } catch(error) {
            setNotificationError(true);
        }
    }

    async function getReviewStats() {
        const url = "http://localhost:9000/api/admin/getreviewstats";
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            })

            const data = await res.json();
            if (res.status === 404) {
                setNothingFound(false); 
            } else {
                setNothingFound(false);
                setReviewStats(data.review_stats);
                setFilterReviewStats(data.review_stats); 
            }
        } catch(error) {
            console.log(error);
            setNotificationError(true);
        }
    }

    function handleShowReviewStats() {
        setFilterReviewStats(reviewStats.filter(item => {
            return (item.Firstname === firstname && item.Lastname === lastname) || item.Category === selectedCategory;
        }))
    }



   useEffect(()=> {
    getCategories();
    getReviewStats();
   },[]);

   

    return (
        <div className="flex justify-center space-x-4">
            <div className="pl-4">
                <h1 className="text-center text-2xl mt-2">Admin Review Stats</h1>
                {notificationError && <Notification notificationTitle={"Book Reviews Load Failure"} notificationMsg={"An Unexpected Error Occured while loading book review stats."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}
            
                {
                nothingFound && 
                    <p className="text-lg text-center">No book review stats were found.</p>
                }

               {nothingFound===false &&
                <table className={"auto border-2 border-black mt-4 mb-8 border-collapse border-spacing-4 text-center"}>
                    <caption className={"caption-top mb-2 text-lg font-medium"}>Review Stats</caption>
                        <thead>
                            <tr className={"bg-white"}>
                                <th className={"border p-4 border-black"}>ID</th>
                                <th className={"border p-4 border-black"}>Firstname</th>
                                <th className={"border p-4 border-black"}>Lastname</th>
                                <th className={"border p-4 border-black"}>Category</th>
                                <th className={"border p-4 border-black"}>Likert AVG</th>
                            </tr>
                            </thead>
                            <tbody>

                                { 
                                    filterReviewStats.map((item,index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={"border p-2 border-black"}>{item.User_id}</td>
                                                <td className={"border p-2 border-black"}>{item.Firstname}</td>
                                                <td className={"border p-2 border-black"}>{item.Lastname}</td>
                                                <td className={"border p-2 border-black"}>{item.Category}</td> 
                                                <td className={"border p-2 border-black"}>{Math.floor(item.Review_AVG)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                </table>}
        </div>

        <div className="box-border h-fit w-fit border-2 border-black rounded mt-14 p-8 shadow-xl mt-24 sticky top-0 bg-gray-50">
                <h1 className="text-center text-xl mb-4">Search </h1>
                <input 
                    type="search" 
                    className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                    placeholder="Firstname"
                    onChange={(event) => setFirstname(event.target.value)}
                />

                <input 
                    type="search" 
                    className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                    placeholder="Lastname"
                    onChange={(event) => setLastname(event.target.value)}
                />    

                <select className="block w-fit px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4"
                            onChange={(event) => setSelectedCategory(event.target.value)}>
                        <option defaultValue={"Category"}>Select Category</option>
                        {
                            categories.map((item,index) => {
                                return <option key={index} value={item.Category}>{item.Category}</option>
                            })
                        }
                </select>  
                    
                <div className="flex justify-left space-x-4">
                    <div>
                        <button className="border-2 border-black rounded-md p-1 w-fit h-fit hover:shadow-xl hover:text-white hover:bg-black"
                            onClick={handleShowReviewStats}>Show Stats</button>
                    </div>

                    <div>
                    <button className="border-2 border-black rounded-md p-1 w-fit h-fit hover:shadow-xl hover:text-white hover:bg-black"
                            onClick={() => setFilterReviewStats(reviewStats)}>Show All</button>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default AdminReviewStats;