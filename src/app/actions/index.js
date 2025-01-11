"use server";

import { hash } from "bcryptjs";
import connectMongo from "@/lib/connectMongo";
import { User } from "@/models/Model";
import { signIn, signOut } from "../../../auth";
export const doSignIn = async () => {
  await signIn("google", {
    callbackUrl: "http://localhost:3000",
    redirect: true,
  });
};

export const doSignOut = async () => {
  await signOut();
};

export const logIn = async (formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("email and password:", email, password);

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!!response.error) {
      console.error("Sign-in failed:", response.error);
      throw new Error(response.error || "Invalid credentials");
    }

    console.log("Login successful for email:", email);
    return response;
  } catch (error) {
    console.error("Error in logIn function:", error.message);
    throw error;
  }
};
export const registerUser = async (formData) => {
  try {
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
    const image = formData.get("image")?.trim();

    // Validate required fields
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address.");
    }

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use.");
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image,
    });

    await newUser.save();

    return { ok: true, message: "Registration successful!" };
  } catch (error) {
    console.error("Error registering user:", error.message);
    return { ok: false, error: error.message };
  }
};
