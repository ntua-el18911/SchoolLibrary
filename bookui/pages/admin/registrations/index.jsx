import MenuBarAdmin from "@/Components/MenuBarAdmin";
import { useRouter } from "next/router";

function Registrations() {
    
    const router = useRouter();
    
    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            Registrations
        </div>
    )
}

export default Registrations;