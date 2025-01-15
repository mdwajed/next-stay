import Image from "next/image";
import React from "react";
import ToggleButton from "./ToggleButton";

import Link from "next/link";
import { auth } from "../../../../auth";
import NavSearch from "./NavSearch";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Hotel Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <NavSearch />

      <div className="flex items-center space-x-4 relative justify-end">
        <button>
          <i className="fas fa-language text-zinc-700 text-xl"></i>
        </button>

        <ToggleButton session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
