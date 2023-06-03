import MenuBarSI from "@/Components/MenuBarSI";
import MyBooks from "@/Components/MyBooks";
import { useRouter } from "next/router";


function myBooks() {

    const router = useRouter();

    return (
        <div>
            <MenuBarSI page={router.pathname} />
            <MyBooks />
        </div>
    );
}

export default myBooks;