import MenuBarAdmin from "@/Components/MenuBarAdmin";
import ReservationAdmin from "@/Components/ReservationAdmin";
import { useRouter } from "next/router";

function Reservations() {
    
    const router = useRouter();
    
    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            <ReservationAdmin />
        </div>
    )
}

export default Reservations;