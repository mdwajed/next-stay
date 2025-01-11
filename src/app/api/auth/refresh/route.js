import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    console.log("Authorization Header:", authHeader);
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header is required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const refreshToken = authHeader?.split(" ")[1];
    console.log("Extracted Refresh Token:", refreshToken);

    if (!refreshToken || typeof refreshToken !== "string") {
      return new Response(
        JSON.stringify({
          error: "Refresh token is required and must be valid.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return new Response(
      JSON.stringify({
        accessToken: newAccessToken,
        refreshToken,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in /api/auth/refresh:", error);

    const status = error.name === "JsonWebTokenError" ? 403 : 500;
    return new Response(
      JSON.stringify({ error: "Invalid or expired refresh token." }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
}
