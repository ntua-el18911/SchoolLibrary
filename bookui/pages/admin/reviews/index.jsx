import AdminReviewStats from "@/Components/AdminReviewStats";
import MenuBarAdmin from "@/Components/MenuBarAdmin";
import { useRouter } from "next/router";

function AdminReviews() {
    
    const router = useRouter();

    return (
        <div>
            <MenuBarAdmin page={router.pathname} />
            <AdminReviewStats />
        </div>    
    )
}

export default AdminReviews;