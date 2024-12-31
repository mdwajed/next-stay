"use client";
import React, { useState } from "react";

const ToggleButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
      >
        <i className="fas fa-bars"></i>
        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
          <i className="fas fa-user text-white"></i>
        </span>
      </button>
      {isDropdownOpen && (
        <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50">
          <ul className="">
            <a href="/login" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Login
              </li>
            </a>

            <a href="/signup" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Signup
              </li>
            </a>

            <a href="#" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Help
              </li>
            </a>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
