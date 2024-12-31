import Image from "next/image";
import React from "react";
import { DeleteBTN, EditBTN } from "./CreateHotelBTN";
import Link from "next/link";

const HotelManageCard = () => {
  return (
    <Link href="/">
      <div className="overflow-hidden cursor-pointer">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hotel Property"
            width={192}
            height={192}
            className="w-full h-48 object-cover rounded-md transition-all hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
            <i className="fas fa-star text-yellow-500 mr-1"></i>4.8
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            Cozy Mountain Retreat
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-zinc-600">3 Rooms Available</span>
            <span className="text-rose-600 font-semibold">$250/night</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Location: Mountain View, CA</span>
            <div className="space-x-2">
              <EditBTN />
              <DeleteBTN />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelManageCard;
