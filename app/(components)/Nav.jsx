"use client";

import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <p className="text-default-text">{session.user.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-default-text">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
