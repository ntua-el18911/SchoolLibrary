import { useState } from "react";

function BookReservation(
        {
            title, 
            user_id, 
            isbn, 
            school_id,
            setBookReservationVisible, 
            setCompleteReservation, 
            setFailedReservation, 
            setUnavailableBook,
            setReservationExists,
            setReservationForbidden
        }
    ) 
{

    const [date,setDate] = useState();
    
    async function handleCreateBookReservation() {

        const url = "http://localhost:9000/api/addreservation";

        const params = {
            school_id : school_id,
            user_id : user_id,
            ISBN : isbn,
            reservation_date : date,
        }

        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(params)
        });

        if (res.status === 200) {
            setCompleteReservation(true);
        }

        if (res.status === 400) {
            setUnavailableBook(true);
        }

        if (res.status === 500) {
            setFailedReservation(true);
        }

        if (res.status === 406) {
            setReservationExists(true);
        }

        if (res.status === 403) {
            setReservationForbidden(true);
        }
    
        setBookReservationVisible(false);

    }

    return (
        <div className="mx-auto box-border h-fit w-fit border-2 border-black rounded mt-14 p-8 shadow-xl sticky top-0 bg-gray-100">
            
            <h1 className="text-xl text-center mb-4">Reservation For Book: {title}</h1>
            <label>Select Date</label>
            <input 
                type="date" 
                className="block w-full px-4 py-2 rounded-md border-2 border-black focus:outline-none  bg-white mb-4"
                onChange={(event) => setDate(event.target.value)}
            />

            <div className="flex space-x-4">

                <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                    onClick={handleCreateBookReservation}>Create</button>

                <button className="mb-4 border-2 border-black rounded-lg p-4 w-36 h-14 hover:shadow-xl hover:text-white hover:bg-black"
                    onClick={()=> setBookReservationVisible(false)}    >Cancel</button>
            </div>
        </div>
    )
}

export default BookReservation;