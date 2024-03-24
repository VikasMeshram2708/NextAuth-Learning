import { authOptions } from "@/helpers/AuthOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <nav className="bg-slate-950 p-3 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-[2rem] italic">
          <Link href="/">BharatMart</Link>
        </h1>
        {!session && (
          <button
            type="button"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:shadow-lg shadow-slate-950"
          >
            <Link href="/api/auth/signin">Login / Sign Up</Link>
          </button>
        )}
        {
          session && <button type="button" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:shadow-lg shadow-slate-950">
            {session.user?.name}
          </button>
        }
      </div>
    </nav>
  );
}
