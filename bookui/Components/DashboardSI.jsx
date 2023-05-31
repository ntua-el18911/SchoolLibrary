/*
    Dashboard for Student and Instructor.
*/

import MenuBarSI from "./MenuBarSI";
import { useRouter } from "next/router";

export default function DashboardSI() {

    const router = useRouter();

    return (
        <div>
            <MenuBarSI page={router.pathname}/>
        </div>
    )
}