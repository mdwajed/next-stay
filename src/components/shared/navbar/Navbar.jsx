import Image from "next/image";
import React from "react";
import ToggleButton from "./ToggleButton";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center">
        <a href="./index.html">
          <Image
            src="/logo.svg"
            alt="Hotel Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </a>
      </div>

      <div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
        <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
          <input
            type="text"
            placeholder="Where to?"
            className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
          />
        </div>

        <button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
          <i className="fas fa-search text-white"></i>
        </button>
      </div>

      <div className="flex items-center space-x-4 relative justify-end">
        <button>
          <i className="fas fa-language text-zinc-700 text-xl"></i>
        </button>

        <ToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
