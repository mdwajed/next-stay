"use client";
import React from "react";
import { handleDownloadReceipt } from "./HandleDownload";

const Download = ({ paymentSummary }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={() => handleDownloadReceipt(paymentSummary)}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-90"
      >
        <i className="fas fa-download mr-2"></i>
        Download Receipt
      </button>
    </div>
  );
};

export default Download;
