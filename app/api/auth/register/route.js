import Users from "@/models/Users";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new NextResponse("Invalid email", {
      status: 404,
    });
  }

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const existingUser = await Users.findOne({ email }); // Check if user with the same email already exists

  if (existingUser) {
    return new NextResponse("Email already exists", {
      status: 400,
    });
  }

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
