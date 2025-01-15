import { PDFDocument, rgb } from "pdf-lib";
import download from "downloadjs";
import { Canvg } from "canvg";

export const handleDownloadReceipt = async (paymentSummary) => {
  const { reservationDetails, priceDetails, billingDetails } = paymentSummary;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  // Margins
  const marginTop = 20;
  const marginBottom = 20;
  const logoHeight = 50;
  const logoStartY = 800 - marginTop;

  // Add Hotel Logo from SVG
  const svgLogoUrl = "/logo.svg";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const svgResponse = await fetch(svgLogoUrl);
  const svgText = await svgResponse.text();

  const canvgInstance = Canvg.fromString(ctx, svgText);
  await canvgInstance.render();

  const pngUrl = canvas.toDataURL("image/png");
  const pngBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(pngBytes);

  // Draw the logo with margins
  page.drawImage(logoImage, {
    x: 230,
    y: logoStartY - logoHeight,
    width: 80,
    height: logoHeight,
  });

  // Calculate Y position for the next content
  const nextContentY = logoStartY - logoHeight - marginBottom;

  // Add Header
  page.drawText("Hotel Reservation Receipt", {
    x: 180,
    y: nextContentY,
    size: 18,
    color: rgb(0, 0, 0),
  });

  // Adjust further content dynamically
  let currentY = nextContentY - 30;

  // Guest Name
  page.drawText(`Guest Name: ${billingDetails?.name}`, {
    x: 20,
    y: currentY,
    size: 12,
  });

  // Reservation Details
  currentY -= 30;
  page.drawText("Reservation Details:", { x: 20, y: currentY, size: 12 });

  currentY -= 20;
  page.drawText(`Hotel: ${reservationDetails?.hotel?.name}`, {
    x: 40,
    y: currentY,
    size: 10,
  });

  currentY -= 20;
  page.drawText(
    `Check-in: ${new Date(
      reservationDetails?.checkInDate,
    ).toLocaleDateString()}`,
    { x: 40, y: currentY, size: 10 },
  );

  currentY -= 20;
  page.drawText(
    `Check-out: ${new Date(
      reservationDetails?.checkOutDate,
    ).toLocaleDateString()}`,
    { x: 40, y: currentY, size: 10 },
  );

  currentY -= 20;
  page.drawText(`Nights: ${priceDetails?.nights}`, {
    x: 40,
    y: currentY,
    size: 10,
  });

  // Payment Summary
  currentY -= 40;
  page.drawText("Payment Summary:", { x: 20, y: currentY, size: 12 });

  currentY -= 20;
  page.drawText(
    `Total Amount Paid: $${(priceDetails?.total ?? 0).toFixed(2)}`,
    { x: 40, y: currentY, size: 10 },
  );

  currentY -= 20;
  page.drawText(
    `Cleaning Fee: $${(priceDetails?.cleaningFee ?? 0).toFixed(2)}`,
    { x: 40, y: currentY, size: 10 },
  );

  currentY -= 20;
  page.drawText(`Service Fee: $${(priceDetails?.serviceFee ?? 0).toFixed(2)}`, {
    x: 40,
    y: currentY,
    size: 10,
  });

  // Billing Address
  currentY -= 40;
  page.drawText("Billing Address:", { x: 20, y: currentY, size: 12 });

  currentY -= 20;
  page.drawText(`${billingDetails?.address.line1}`, {
    x: 40,
    y: currentY,
    size: 10,
  });

  currentY -= 20;
  page.drawText(
    `${billingDetails?.address.city}, ${billingDetails?.address.state}`,
    { x: 40, y: currentY, size: 10 },
  );

  currentY -= 20;
  page.drawText(
    `${billingDetails?.address.country}, ${billingDetails?.address.postalCode}`,
    { x: 40, y: currentY, size: 10 },
  );

  // Serialize PDF
  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "Reservation_Receipt.pdf", "application/pdf");
};
