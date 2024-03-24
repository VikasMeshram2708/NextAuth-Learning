import Link from "next/link";

export default function Login() {
  return (
    <section className="min-h-screen text-white bg-slate-900">
      <h1>Welcome to Login Page.</h1>
      <form className="max-w-sm mx-auto bg-slate-950 p-5 grid gap-5">
        <h1 className="text-[1.5rem] font-semibold text-center">Login</h1>
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-2 rounded-md"
          />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-5">
          <button
            type="button"
            className="w-full p-2 bg-purple-800 hover:bg-purple-500 rounded-md"
          >
            Login
          </button>
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <p>Not a User ? </p>
            <Link href="/signup" className="hover:underline underline-offset-4">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
