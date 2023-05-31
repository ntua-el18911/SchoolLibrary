import Link from "next/link"

export default function MenuBarSI({page}) {


    return (
        <nav className={"bg-white w-full border-b-2 border-black"}>

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

                    {page === "/signout" &&  
                        <Link
                            href={"/"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Sign Out
                        </Link>
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