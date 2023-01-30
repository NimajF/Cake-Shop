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
            <Link href="/desayunos">
              <a>Desayunos y Box</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/box">
              <a>Box</a>
            </Link>
          </li> */}
          <li>
            <Link href="/postres">
              <a>Postres</a>
            </Link>
          </li>
        </ul>
        {/* <ul>
          <li>
            <b>Ayuda</b>
          </li>
          <li>
            <a>Como comprar</a>
          </li>
          <li>
            <a>Sobre mi</a>
          </li>
        </ul> */}
        <ul>
          <li>
            <b>Contactame</b>
          </li>
          <li>
            <FiInstagram />
            <a
              href="https://instagram.com/dulcevictorinaok?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <FaWhatsapp />
            <a href="https://wa.link/2nbked" rel="noopener noreferrer">
              Whatsapp
            </a>
          </li>
          <li>
            <FiMail />
            <a href="mailto:dulcevictorinaok@gmail.com">Correo</a>
          </li>
        </ul>
      </div>
      <p>Derechos reservados a Pili!!</p>
    </div>
  );
}
