import Link from "next/link"
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function MenuBarSI({page}) {

    const router = useRouter();

    function signout() { //TODO ISSUE
        Cookies.remove("id", { path : '/', domain: 'localhost'});
        router.push("/");
    }


    return (
        <nav className={"bg-white w-full border-b-2 border-black sticky top-0"}>

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start bg-white">
                    
                    {page === "/dashboard" &&  
                        <Link
                            href={"/dashboard"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                Books
                        </Link>
                    }

                    {page !== "/dashboard" &&  
                        <Link
                            href={"/dashboard"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Books
                        </Link>
                    }

                    {page === "/mybooks" &&  
                        <Link
                            href={"/mybooks"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                My Books
                        </Link>
                    }

                    {page !== "/mybooks" &&  
                        <Link
                            href={"/mybooks"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                My Books
                        </Link>
                    }

                    {page === "/reservations" &&  
                        <Link
                            href={"/reservations"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                My Reservations
                        </Link>
                    }

                    {page !== "/reservations" &&  
                        <Link
                            href={"/reservations"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                My Reservations
                        </Link>
                    }

                    {page === "/mybookhistory" &&  
                        <Link
                            href={"/mybookhistory"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                My Books History
                        </Link>
                    }

                    {page !== "/mybookhistory" &&  
                        <Link
                            href={"/mybookhistory"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                My Books History
                        </Link>
                    }

                    {page === "/signout" &&  
                        // <Link
                        //     href={"/"}
                        //     className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                        //         Sign Out
                        // </Link>

                        <button
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium"
                            onClick={signout}>
                            Sign Out
                        </button>
                    }

                    {page !== "/signout" &&  
                        <Link
                            href={"/"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Sign Out
                        </Link>
                    }
                </div>
            </div>
        </nav>
    );
}