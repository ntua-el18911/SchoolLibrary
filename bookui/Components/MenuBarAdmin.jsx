import Link from "next/link"

export default function MenuBarAdmin({page}) {


    return (
        <nav className={"bg-white w-full border-b-2 border-black"}>

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start bg-white">
                    
                    {page === "/admin/dashboard" &&  
                        <Link
                            href={"/admin/dashboard"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                Books
                        </Link>
                    }

                    {page !== "/admin/dashboard" &&  
                        <Link
                            href={"/admin/dashboard"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Books
                        </Link>
                    }

                    {page === "/admin/reservations" &&  
                        <Link
                            href={"/admin/reservations"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                Reservations
                        </Link>
                    }

                    {page !== "/admin/reservations" &&  
                        <Link
                            href={"/admin/reservations"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Reservations
                        </Link>
                    }

                    {page === "/admin/registrations" &&  
                        <Link
                            href={"/admin/registrations"}
                            className="bg-black text-white px-3 py-2 text-sm font-medium">
                                Registrations
                        </Link>
                    }

                    {page !== "/admin/registrations" &&  
                        <Link
                            href={"/admin/registrations"}
                            className="bg-white hover:text-black text-black px-3 py-2 text-sm font-medium">
                                Registrations
                        </Link>
                    }

                    {page === "/admin/signout" &&  
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