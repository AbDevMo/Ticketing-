import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/app/(models)/Ticket";

// Create Ticket
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const ticketData = body.formData;

    await Ticket.create(ticketData);

    return NextResponse.json(
      { message: "Ticket created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating ticket:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get All Tickets
export async function GET() {
  try {
    await connectDB();
    const tickets = await Ticket.find({});
    return NextResponse.json(tickets, { status: 200 });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
