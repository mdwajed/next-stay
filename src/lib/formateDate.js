export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "Invalid date range";

  try {
    const start = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(startDate));

    const end = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
      new Date(endDate)
    );

    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      new Date(startDate)
    );

    return `${start} - ${end}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date range";
  }
};
