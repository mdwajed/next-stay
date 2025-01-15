"use client";

import { SignOut } from "@/components/auth/SignOut";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ToggleButton = ({ session }) => {
  console.log("toggle session", session);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div>
      <button className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center">
        <i className="fas fa-bars"></i>
        <span className="bg-zinc-600 w-8 h-8 rounded-full flex items-center justify-center text-xs text-white">
          <i
            onClick={toggleDropdown}
            className="fas fa-user text-white bg-black rounded-full"
          ></i>
        </span>
      </button>
      {isDropdownOpen && (
        <div className="max-w-48 w-48  bg-[#263238] text-white shadow-md border rounded-md absolute right-0 top-full max-h-fit mt-3 z-50">
          <ul className="">
            {session ? (
              <div className=" py-4">
                <div className="flex flex-col justify-center items-center rounded-full ">
                  <Image
                    src={session?.user?.image}
                    alt="Hotel Logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain bg-white rounded-full border-[6px] border-blue-800"
                  />
                  <p className="mt-2 font-bold">{session?.user?.name}</p>
                </div>
                <div className="flex flex-col text-white items-start pl-4">
                  <Link
                    href="/create"
                    onClick={closeDropdown}
                    className="px-3 py-2 text-sm  transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    Create Hotels
                  </Link>
                  <Link
                    href="/manage"
                    onClick={closeDropdown}
                    className="px-3 py-2 text-sm  transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    Manage Hotels
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={closeDropdown}
                    className="px-3 py-2 text-sm  transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    Bookings
                  </Link>
                  <li className="px-3 py-2 text-sm  transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    <SignOut />
                  </li>
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-white items-center p-4">
                <div className="flex flex-col items-center justify-center rounded-ful">
                  <div className="flex items-center justify-center text-white bg-black rounded-full w-12 h-12">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Link
                    href="/login"
                    onClick={closeDropdown}
                    className="px-3 py-2 text-sm w-full transition-all
                  hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    {" "}
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeDropdown}
                    className="w-full px-3 py-2 text-sm  transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                  >
                    Signup
                  </Link>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
