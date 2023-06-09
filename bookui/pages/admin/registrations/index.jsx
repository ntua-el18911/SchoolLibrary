import AdminRegistration from "@/Components/AdminRegistrations";
import MenuBarAdmin from "@/Components/MenuBarAdmin";
import { useRouter } from "next/router";

function Registrations() {
    
    const router = useRouter();
    
    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            <AdminRegistration />
        </div>
    )
}

export default Registrations;