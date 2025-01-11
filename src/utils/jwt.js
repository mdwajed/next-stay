import jwt from "jsonwebtoken";
import axios from "axios";
export const signAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export async function refreshAccessToken(token) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
      {
        refreshToken: token.refreshToken,
      }
    );

    const refreshedTokens = response.data;

    return {
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken, // Use old one if not returned
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000, // Convert expiresIn to ms
    };
  } catch (error) {
    console.error(
      "Failed to refresh access token:",
      error.response?.data || error.message
    );
    throw new Error("RefreshAccessTokenError");
  }
}
