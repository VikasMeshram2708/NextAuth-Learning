import { authOptions } from "@/helpers/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function LoggedIn() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <div>
      <h1>Logged In User : {JSON.stringify(session?.user?.name)}</h1>
    </div>
  );
}
