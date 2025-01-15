import connectMongo from "@/lib/connectMongo";
import { User } from "@/models/Model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // Validate email and password
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    await connectMongo();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    return new Response(
      JSON.stringify({
        accessToken,
        refreshToken,
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image || null,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in /api/auth/login:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
