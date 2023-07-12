import Checkout from "@/models/Checkout";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


export const POST = async (request , {params}) => {
   
  
    try {
        const {name , productName , phone , address , color , size , totalPrice} = await request.json();

        connectDB();

        const newOrder = new Checkout({
            name,
            productName,
            phone,
            address,
            color,
            size,
            totalPrice
        })

        await Checkout.create(newOrder);
  
      return new NextResponse( "Order has been created", {
        status: 200,
        headers: { "content-type": "application/json", corsHeaders },
      });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
  };

 