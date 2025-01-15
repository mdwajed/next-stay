import HotelDetails from "@/components/hotel/details/HotelDetails";
import React from "react";
export async function generateMetadata({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${params.id}`,
    {
      cache: "no-store",
    },
  );
  const hotel = await response.json();
  console.log("single hotel", hotel);
  return {
    title: `${hotel.hotel.name} - ${hotel.hotel.address}`,
    description: hotel.hotel.description,
  };
}

async function fetchHotelDetails(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) throw new Error("Failed to fetch hotel details");

  return response.json();
}
const HotelDetailsPage = async ({ params }) => {
  const { id } = params;
  const hotel = await fetchHotelDetails(id);
  return (
    <div>
      <HotelDetails hotel={hotel} />
    </div>
  );
};

export default HotelDetailsPage;
