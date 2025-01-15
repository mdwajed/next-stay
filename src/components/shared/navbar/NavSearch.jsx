"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    // Redirect to the home page with the search query
    router.push(`/?search=${encodeURIComponent(searchTerm)}`);
  };
  return (
    <div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Where to?"
          className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0"
      >
        <i className="fas fa-search text-white"></i>
      </button>
    </div>
  );
};

export default NavSearch;
