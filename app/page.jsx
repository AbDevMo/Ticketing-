import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import Ticket from "@/models/Ticket";
import { connectDB } from "@/lib/mongodb";

const Dashboard = async () => {
  // Require login
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // Get tickets directly from DB
  await connectDB();
  let tickets = [];
  try {
    const docs = await Ticket.find({}).lean(); // <-- use .lean() for plain objects
    tickets = JSON.parse(JSON.stringify(docs)); // ensures they’re serializable
  } catch (err) {
    console.error("Error fetching tickets:", err);
  }

  // Ensure tickets is always an array
  tickets = Array.isArray(tickets) ? tickets : [];

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={filteredTicket._id.toString()}
                      key={filteredTicket._id.toString()}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
