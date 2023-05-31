import { useRouter } from "next/router";
import MenuBarAdmin from "./MenuBarAdmin";

function DashboardAdmin() {
    
    const router = useRouter();
    
    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
        </div>
    )
}

export default DashboardAdmin;