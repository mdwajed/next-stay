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
      <button
        onClick={toggleDropdown}
        className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
      >
        <i className="fas fa-bars"></i>
        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="Hotel Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-cover rounded-full "
            />
          ) : (
            <i className="fas fa-user text-white bg-black rounded-full"></i>
          )}
        </span>
      </button>
      {isDropdownOpen && (
        <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-3 z-50">
          <ul className="">
            {session ? (
              <div className="flex flex-col">
                <Link
                  href="/create"
                  className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                >
                  Create Hotels
                </Link>
                <Link
                  href="/manage"
                  className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                >
                  Manage Hotels
                </Link>
                <Link
                  href="/bookings"
                  className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4"
                >
                  Bookings
                </Link>
                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                  <SignOut />
                </li>
              </div>
            ) : (
              <>
                <Link href="/login" className="w-full" onClick={closeDropdown}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Login
                  </li>
                </Link>
                <Link
                  href="/register"
                  className="w-full"
                  onClick={closeDropdown}
                >
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Signup
                  </li>
                </Link>
              </>
            )}

            {/* <Link href="/register" className="w-full" onClick={closeDropdown}>
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Signup
              </li>
            </Link> */}

            {/* <Link href="#" className="w-full" onClick={closeDropdown}>
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Help
              </li>
            </Link> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
