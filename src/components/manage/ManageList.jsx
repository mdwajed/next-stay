// "use client";
import React from "react";
import HotelCard from "./HotelManageCard";
import { CreateBTN } from "./CreateHotelBTN";

const ManageList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Manage Hotels</h1>
        <CreateBTN />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div>
    </div>
  );
};

export default ManageList;