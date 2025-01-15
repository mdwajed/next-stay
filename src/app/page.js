import HotelCard from "@/components/hotel/HotelCard";
import Pagination from "@/components/hotel/Pagination";
export async function fetchHotels(page = 1, limit = 8, search = "") {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/hotels?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    { cache: "no-store" },
  );

  if (!response.ok) throw new Error("Failed to fetch hotels");

  return response.json();
}
export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const search = searchParams.search || "";
  const { data: hotels, pagination } = await fetchHotels(page, 8, search);
  return (
    <>
      <section className="px-6">
        {search && (
          <p className="text-gray-500 mb-4">
            Showing results for: <strong>{search}</strong>
          </p>
        )}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.length > 0 ? (
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
          ) : (
            <p>No hotels match your search.</p>
          )}
        </div>
      </section>

      <Pagination pagination={pagination} currentPage={page} />
    </>
  );
}
