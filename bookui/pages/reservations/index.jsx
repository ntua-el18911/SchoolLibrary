import MenuBarSI from "@/Components/MenuBarSI";
import UserReservations from "@/Components/UserReservations";
import { useRouter } from "next/router";

function Reservations() {
    
    const router = useRouter();
    
    return (
        <div>

            <MenuBarSI page={router.pathname}/>
            <UserReservations />
        </div>
    )
}

export default Reservations;