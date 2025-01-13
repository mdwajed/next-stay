export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "Invalid date range";

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return "Invalid date range";
    }

    const formattedStart = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(start);

    const formattedEnd = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(end);

    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      start
    );

    return `${formattedStart} - ${formattedEnd}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date range";
  }
};
