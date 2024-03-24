import Logout from "@/components/Logout";
import { authOptions } from "@/helpers/AuthOptions";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("data", session);
  return (
    <section className="min-h-screen text-white bg-slate-900">
      <h1 className="text-center text-[2rem] pt-10">DashBoard Page.</h1>
      {session ? (
        <h1 className="text-[1.5rem] font-semibold text-center">
          Current User :{" "}
          <span className="text-red-500"> {session.user?.name}</span>
        </h1>
      ) : (
        <p className="text-red-500 font-semibold text-center">
          No Users Found...
        </p>
      )}
      {session && <Logout />}
    </section>
  );
}
