import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DataContext } from "../store/GlobalState";
import Image from "next/image";
import Link from "next/link";
import { BsBag } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cart } = useContext(DataContext);
  const [cartNumber, setCartNumber] = useState(0);
  const cartObj = Object.values(cart);
  // const cartNumber = Object.values(cart).length;

  // const cnum = Object.values(cart).map((item) => item.quantity);

  useEffect(() => {
    let cartNum = 0;
    for (let product of cartObj) {
      cartNum += product.quantity;
    }
    setCartNumber(cartNum);
  }, [cart]);

  return (
    <nav className="navbar">
      <Link href="/">
        <span className="logo">
          <Image src="/logo.jpg" height="65px" width="65px" />
        </span>
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
          <span className="bag-wrapper">
            <BsBag />
            {cartNumber > 0 && (
              <b className={cartNumber > 0 && "show-number"}>{cartNumber}</b>
            )}
          </span>
        </Link>
      </div>
    </nav>
  );
}
