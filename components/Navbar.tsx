import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 p-3 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-[2rem] italic">
          <Link href="/">BharatMart</Link>
        </h1>
        <button
          type="button"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:shadow-lg shadow-slate-950"
        >
          <Link href="/login">Login / Sign Up</Link>
        </button>
      </div>
    </nav>
  );
}
