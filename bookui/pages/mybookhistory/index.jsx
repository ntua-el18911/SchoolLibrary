import BooksHistory from "@/Components/BookHistorySI";
import MenuBarSI from "@/Components/MenuBarSI";
import { useRouter } from "next/router";


function myBooksHistory() {

    const router = useRouter();

    return (
        <div>
            <MenuBarSI page={router.pathname} />
            <BooksHistory />
        </div>
    );
}

export default myBooksHistory;