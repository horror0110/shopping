import Basket from "@/models/Basket";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};



  export const DELETE = async (request , {params}) => {
    connectDB();
  
    try {
      const products = await Basket.deleteMany({email:params.id});
  
      return new NextResponse(JSON.stringify(products), {
        status: 200,
        headers: { "content-type": "application/json", corsHeaders },
      });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
  };