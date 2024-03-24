import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-slate-900">
      <div className="flex justify-center pt-10">
        <p role="button" className="px-4 hover:shadow-slate-500 shadow-lg py-2 bg-slate-950 hover:bg-salte-900 rounded-md">
          <Link href="/dashboard">Go to DashBoard</Link>
        </p>
      </div>
    </main>
  );
}
