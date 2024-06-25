"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dosens?search=" + search);
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex">
          <input
            type="text"
            required
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Cari Dosen Kalian"
            className="border-[#003566] border-2 rounded-[8px] lg:w-72 w-[200px] bg-[#DFF6FF] placeholder:text-[#003566] placeholder:pl-2"
          />
          <button type="submit" className="bg-[#003566] text-white px-5 py-2 rounded-lg ml-2">
            Cari
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
