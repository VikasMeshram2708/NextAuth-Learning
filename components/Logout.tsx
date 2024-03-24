"use client";

import { signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function Logout() {
  const handleLogout = async () => {
    await signOut();
    toast.success("User Logged out.");
    await Promise.resolve();
  };
  return (
    <>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold"
        >
          Logout
        </button>
      </div>
      <Toaster />
    </>
  );
}
