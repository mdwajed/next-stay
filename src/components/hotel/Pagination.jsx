"use client";
import Link from "next/link";

const Pagination = ({ pagination, currentPage }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <nav>
        <ul className="flex items-center">
          {currentPage > 1 && (
            <li>
              <Link
                href={`/?page=${currentPage - 1}`}
                className="px-4 py-2 border bg-white text-blue-500 hover:bg-blue-100"
              >
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left"></i>
              </Link>
            </li>
          )}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <Link
                  href={`/?page=${pageNumber}`}
                  className={`py-2 px-4  border ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }`}
                >
                  {pageNumber}
                </Link>
              </li>
            ),
          )}
          {currentPage < pagination.totalPages && (
            <li>
              <Link
                href={`/?page=${currentPage + 1}`}
                className="px-4 py-2 border bg-white text-blue-500 hover:bg-blue-100"
              >
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right"></i>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
