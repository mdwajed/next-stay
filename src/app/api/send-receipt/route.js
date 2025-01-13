import nodemailer from "nodemailer";
import { PDFDocument } from "pdf-lib";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, reservationDetails, priceDetails, billingDetails } = body;

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    page.drawText("Your Reservation Receipt", { x: 50, y: 750, size: 20 });
    page.drawText(`Guest Name: ${billingDetails?.name || "N/A"}`, {
      x: 50,
      y: 720,
      size: 12,
    });
    page.drawText(`Hotel: ${reservationDetails?.hotel?.name || "N/A"}`, {
      x: 50,
      y: 700,
      size: 12,
    });
    page.drawText(
      `Check-in: ${
        reservationDetails?.checkInDate
          ? new Date(reservationDetails?.checkInDate).toLocaleDateString()
          : "N/A"
      }`,
      { x: 50, y: 680, size: 12 }
    );
    page.drawText(
      `Check-out: ${
        reservationDetails?.checkOutDate
          ? new Date(reservationDetails?.checkOutDate).toLocaleDateString()
          : "N/A"
      }`,
      { x: 50, y: 660, size: 12 }
    );
    page.drawText(`Total Paid: $${priceDetails?.total?.toFixed(2) || "0.00"}`, {
      x: 50,
      y: 640,
      size: 12,
    });

    const pdfBytes = await pdfDoc.save();

    // Configure Mailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail email
        pass: process.env.PASSWORD, // Your Gmail app password
      },
    });

    // Send Email with PDF Attachment
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: billingDetails.email,
      subject: "Your Hotel Reservation Receipt",
      text: "Please find your reservation receipt attached.",
      attachments: [
        {
          filename: "Reservation_Receipt.pdf",
          content: pdfBytes,
        },
      ],
    });

    return new Response(
      JSON.stringify({ message: "Receipt sent successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle errors and return them as JSON response
    return new Response(
      JSON.stringify({
        error: "Failed to send receipt",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
