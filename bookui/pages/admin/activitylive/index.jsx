import AdminLiveSystem from "@/Components/AdminLiveSystem";
import MenuBarAdmin from "@/Components/MenuBarAdmin";
import { useRouter } from "next/router";

function ActivityLive() {

    const router = useRouter();

    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            <AdminLiveSystem />
        </div>
    )
}

export default ActivityLive;