import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/app/(models)/Ticket";

// Get Single Ticket
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const foundTicket = await Ticket.findById(id);

    if (!foundTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (err) {
    console.error("Error fetching ticket:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update Ticket
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    const ticketData = body.formData;

    const updated = await Ticket.findByIdAndUpdate(id, ticketData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Ticket updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating ticket:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete Ticket
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Ticket.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting ticket:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
