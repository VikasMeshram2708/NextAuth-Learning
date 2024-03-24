/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSession } from "next-auth/react";

export default function page() {
  const { data } = useSession();
  return (
    <section className="min-h-screen bg-slate-950 text-white">
      {!data && (
        <p className="text-white text-center font-semibold">
          No Users Found...
        </p>
      )}
      {data && (
        <h1 className="text-center">Welcome back : {data?.user?.name}</h1>
      )}
    </section>
  );
}
