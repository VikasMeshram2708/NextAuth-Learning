"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const router = useRouter();
  const [toggleEye, setToggleEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("result", result);
      if (result?.error) {
        return toast.error("Login failed.");
      }
      console.log("login-log", result);
      toast.success("User Loggedin");
      router.refresh();
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (e) {
      console.log(e instanceof Error && e?.message);
      return toast.error(
        "Something went wrong. Failed to Login. Please try again."
      );
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  return (
    <section className="min-h-screen text-white bg-slate-900">
      <div className="h-24"></div>
      <form
        onSubmit={LoginHandler}
        className="max-w-sm rounded-md mx-auto bg-slate-950 p-5 grid gap-5"
      >
        <h1 className="text-[1.5rem] font-semibold text-center">Login</h1>
        {/* Email */}
        <div className="grid gap-3">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            className="w-full p-2 rounded-md text-black"
          />
        </div>
        {/* Password */}
        <div className="relative grid gap-3">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type={toggleEye ? "text" : "password"}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            className="w-full p-2 rounded-md text-black"
          />
          <div className="absolute right-3 bottom-2">
            {toggleEye ? (
              <IoMdEye
                className="cursor-pointer"
                onClick={() => {
                  setToggleEye((prev) => !prev);
                }}
                size={25}
                color="black"
              />
            ) : (
              <IoMdEyeOff
                className="cursor-pointer"
                onClick={() => {
                  setToggleEye((prev) => !prev);
                }}
                size={25}
                color="black"
              />
            )}
          </div>
        </div>
        <div className="mb-5">
          <button
            type="submit"
            className="w-full p-2 bg-purple-800 hover:bg-purple-500 rounded-md font-bold"
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
      <Toaster />
    </section>
  );
}
