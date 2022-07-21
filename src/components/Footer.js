import Link from "next/link";
import { FiInstagram, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <ul>
          <li>
            <b>Categorias</b>
          </li>
          <li>
            <Link href="/tortas">
              <a>Tortas</a>
            </Link>
          </li>
          <li>
            <Link href="/Desayunos">
              <a>Desayunos</a>
            </Link>
          </li>
          <li>
            <Link href="/box">
              <a>Box</a>
            </Link>
          </li>
          <li>
            <Link href="/posters">
              <a>Postres</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <b>A</b>
          </li>
        </ul>
        <ul>
          <li>
            <b>Contactame</b>
          </li>
          <li>
            <FiInstagram />
            <a href="https://instagram.com/dulcevictorinaok?igshid=YmMyMTA2M2Y=">
              Instagram
            </a>
          </li>
          <li>
            <FaWhatsapp />
            <a>Whatsapp</a>
          </li>
          <li>
            <FiMail />
            <a>Correo</a>
          </li>
        </ul>
      </div>
      <p>Derechos reservados a Pili!!</p>
    </div>
  );
}
