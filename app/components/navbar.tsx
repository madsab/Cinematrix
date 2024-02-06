import Link from "@/node_modules/next/link"

const Navbar = () => {
    return(
        <div className=" bg-slate-800 w-full p-6 flex">
            <div className=" flex-1 flex justify-evenly">
                <Link href="/">Home</Link>
                <Link href="/">Browse</Link>
                <Link href="/movies">Movies</Link>
                <Link href="/series">Series</Link>
            </div>
            <div className="flex-1 text-right">
                <Link href="/profile">Profile</Link>
            </div>
        </div>
    )
}
export default Navbar