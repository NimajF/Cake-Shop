import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      <Link href="/">
        <span>Cakes and breakfast</span>
      </Link>
      <div className="nav_links">
        {session && (
          <div>
            <Link href="/api/auth/signout">
              <p>Log out</p>
            </Link>
            <Link href="/create">
              <span>
                <FiEdit />
              </span>
            </Link>
          </div>
        )}
        <Link href="/cart">
          <span>
            <BsBag />
          </span>
        </Link>
      </div>
    </nav>
  );
}
