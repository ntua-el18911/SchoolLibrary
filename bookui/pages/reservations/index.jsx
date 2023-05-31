import MenuBarSI from "@/Components/MenuBarSI";
import { useRouter } from "next/router";

function Reservations() {
    
    const router = useRouter();
    
    return (
        <div>

            <MenuBarSI page={router.pathname}/>
        </div>
    )
}

export default Reservations;