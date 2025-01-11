import Image from "next/image";
import React from "react";

const Gallery = ({ hotel }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px] ">
      <div className="col-span-2 row-span-2">
        <Image
          src={hotel.hotel.image}
          alt={hotel.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {hotel?.hotel?.images?.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt={hotel?.hotel?.name}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
