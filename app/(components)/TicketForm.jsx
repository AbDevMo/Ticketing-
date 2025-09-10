"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  const startingticketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "open",
    category: "general",
  };

  if (EDITMODE) {
    startingticketData["title"] = ticket.title;
    startingticketData["description"] = ticket.description;
    startingticketData["priority"] = ticket.priority;
    startingticketData["progress"] = ticket.progress;
    startingticketData["status"] = ticket.status;
    startingticketData["category"] = ticket.category;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }

      router.refresh();
      router.push("/");
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }

      router.refresh();
      router.push("/");
    }
  };

  const [formData, setFormData] = useState(startingticketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            value={1}
            checked={formData.priority == 1}
            onChange={handleChange}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            value={2}
            checked={formData.priority == 2}
            onChange={handleChange}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            value={3}
            checked={formData.priority == 3}
            onChange={handleChange}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            value={4}
            checked={formData.priority == 4}
            onChange={handleChange}
          />
          <label>4</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
          className="btn"
        />
      </form>
    </div>
  );
};

export default TicketForm;
