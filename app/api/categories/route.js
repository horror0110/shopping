import Cat from "@/models/Cat";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const POST = async (request) => {
  const {
    name,
    description
    
  } = await request.json();

  await connectDB();

  const newUser = new Cat({
    name,
    description
   
    
  });

  try {
    await Cat.create(newUser);
    return new NextResponse("Category has been created", {
      headers: {corsHeaders },
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};

export const GET = async (request) => {
    connectDB();
  
    try {
      const products = await Cat.find();
  
  
      return new NextResponse(JSON.stringify(products), {
        status: 200,
        headers: { "content-type": "application/json", corsHeaders },
      });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
  };