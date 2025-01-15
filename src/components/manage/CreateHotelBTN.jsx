import Link from "next/link";
import React from "react";

export const CreateBTN = () => {
  return (
    <Link
      href="/create"
      className="bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors"
    >
      + Create Hotel
    </Link>
  );
};
export const EditBTN = () => {
  return (
    <Link href="/create" className="text-blue-500 hover:text-blue-600">
      <i className="fas fa-edit"></i>
    </Link>
  );
};
export const DeleteBTN = () => {
  return (
    <button className="text-red-500 hover:text-red-600">
      <i className="fas fa-trash"></i>
    </button>
  );
};
