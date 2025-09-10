import TicketForm from "@/app/(components)/TicketForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/app/(models)/Ticket";

const TicketPage = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const { id } = params;
  const EDITMODE = id !== "new";
  let updateTicketData = {};

  if (EDITMODE) {
    await connectDB();
    try {
      const doc = await Ticket.findById(id).lean();
      updateTicketData = doc ? JSON.parse(JSON.stringify(doc)) : {};
    } catch (err) {
      console.error("Error fetching ticket:", err);
    }
  } else {
    updateTicketData = { _id: "new" };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
