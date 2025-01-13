// import Stripe from "stripe";

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(stripe);
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { amount } = req.body;

//     if (!amount) {
//       return res.status(400).json({ error: "Amount is required" });
//     }

//     // Create a PaymentIntent with the specified amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // Amount in cents
//       currency: "usd", // Change currency if needed
//       payment_method_types: ["card"], // Supports cards, including American Express
//     });

//     // Send the client secret to the client
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount } = await req.json();
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing amount" }),
        { status: 400 }
      );
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
    });
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
