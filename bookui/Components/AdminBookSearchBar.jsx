import { useEffect, useState } from "react";
import Notification from "./Notification";

function AdminBookSearchBar({books, setFilteredBooks}) {

    const [authors,setAuthors] = useState([]);
    const [categories,setCategories] = useState([]);
    const [notificationError,setNotificationError] = useState(false);

    const [selectedAuthor,setSelectedAuthor] = useState();
    const [selectedCategory,setSelectedCategory] = useState();
    const [searchTitle,setSearchTitle] = useState();
    const [searchCopies,setSearchCopies] = useState();

    async function getSearchData() {

        const url_authors = "http://localhost:9000/api/getauthors";
        const url_category = "http://localhost:9000/api/getcategories";

        try {
            const response_authors = await fetch(url_authors, {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response_authors.json();
            setAuthors(data.authors);
        } catch(error) {
            console.error(error);
            setNotificationError(true);
        }

        try {
            const response_category= await fetch(url_category, {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response_category.json();
            setCategories(data.categories);
        } catch(error) {
            console.error(error);
            setNotificationError(true);
        }

    }

    function handleSearch() {
        const pattern = new RegExp("\\b" + searchTitle + "\\b", "i")

        setFilteredBooks(books.filter(item => {
            return item.Author === selectedAuthor || item.Book_Category === selectedCategory || pattern.test(item.Title) || parseInt(item.Copies) <= parseInt(searchCopies);
        }));
    }

    function handleShowAll() {
        setFilteredBooks(books);
    }

    useEffect(() => {
        getSearchData();
    },[]);

    return (
        <div className="box-border h-fit w-2/5 border-2 border-black rounded mt-14 p-8 shadow-xl">
            {notificationError && <Notification notificationTitle={"Search Data Load Failure"} notificationMsg={"An Unexpected Error Occured while loading search data."} notificationInfo={"errors"} setVisibleNotification={setNotificationError}/>}

           <input 
                type="search" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                placeholder="Search for a Title"
                onChange={(event) => setSearchTitle(event.target.value)}
            />

            <select className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4"
                    onChange={(event) => setSelectedCategory(event.target.value)}>
                <option defaultValue={"Category"}>Category</option>
                {
                    categories.map((item,index) => {
                        return <option key={index} value={item.Category}>{item.Category}</option>
                    })
                }
            </select>

            <select className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none hover:cursor-pointer bg-white mb-4"
                    onChange={(event) => setSelectedAuthor(event.target.value)}>
                <option defaultValue={"Author"}>Author</option>
                {
                    authors.map((item,index) => {
                        return <option key={index} value={item.name}>{item.name}</option>
                    })
                }
            </select>

            <input 
                type="number" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                placeholder="Number of Available Copies"
                onChange={(event) => setSearchCopies(event.target.value)}
            />

            <div className="flex space-x-4">

                <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                        onClick={handleSearch}>Search</button>

                <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                        onClick={handleShowAll}>Show All</button>
            </div>
        </div>
    );
}

export default AdminBookSearchBar;