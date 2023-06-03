import AdminBookDelays from "@/Components/AdminBookDelays";
import MenuBarAdmin from "@/Components/MenuBarAdmin";
import { useRouter } from "next/router";

function Reservations() {
    
    const router = useRouter();
    
    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            <AdminBookDelays />
        </div>
    )
}

export default Reservations;