// "use client";
// import React, { useEffect, useState } from "react";
// import HotelCard from "./HotelCard";
// import Pagination from "./Pagination";

// // Function to fetch hotels
// const fetchHotels = async (page = 1, limit = 8) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/hotels?page=${page}&limit=${limit}`,
//       { cache: "no-store" }
//     );
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to fetch hotels: ${errorText}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching hotels:", error.message);
//     throw error;
//   }
// };

// const Hotels = () => {
//   const [hotels, setHotels] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAndSetHotels = async (page = 1) => {
//     setLoading(true);
//     try {
//       const { data, pagination } = await fetchHotels(page);
//       setHotels(data);
//       setPagination(pagination);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setHotels([]);
//       setPagination(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch hotels on initial render
//   useEffect(() => {
//     fetchAndSetHotels(1); // Load the first page initially
//   }, []);

//   const handlePageChange = (newPage) => {
//     fetchAndSetHotels(newPage);
//   };

//   if (loading)
//     return <div className="text-center">Loading hotels, please wait...</div>;
//   if (error) return <div className="text-center text-red-600">{error}</div>;

//   return (
//     <>
//       <section className="px-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {hotels.map((hotel) => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>
//       </section>

//       <Pagination pagination={pagination} onPageChange={handlePageChange} />
//     </>
//   );
// };

// export default Hotels;

// // const { page, totalPages } = pagination;

// // const handlePageChange = (newPage) => {
// //   if (newPage < 1 || newPage > totalPages) return;
// //   onPageChange(newPage);
// // };

// // const renderPageNumbers = () => {
// //   const pages = [];
// //   for (let i = 1; i <= totalPages; i++) {
// //     pages.push(
// //       <button
// //         key={i}
// //         onClick={() => handlePageChange(i)}
// //         className={`py-2 px-3 leading-tight border ${
// //           i === page
// //             ? "bg-zinc-300 text-white"
// //             : "bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
// //         }`}
// //       >
// //         {i}
// //       </button>
// //     );
// //   }
// //   return pages;
// // };

// // disabled={page === 1}
// // onClick={() => handlePageChange(page - 1)}

// // disabled={page === totalPages}
// // onClick={() => handlePageChange(page + 1)}
