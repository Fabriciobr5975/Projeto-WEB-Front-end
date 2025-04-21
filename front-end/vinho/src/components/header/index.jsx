import "./index.scss";

import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <div className="elementos-header">
        <picture className="logo">
          <img src="/assets/images/logo.svg" alt="Logo" />
        </picture>
        
        <div className="links-header">
          <ul className="lista-links-header">
            <li>
              <Link>Vinho</Link>
            </li>
            <li>
              <Link>Vinicola</Link>
            </li>
            <li>
              <Link>Contato</Link>
            </li>
          </ul>
        </div>

        <div className="dados-usuario-header">
          <span>
            Welcome, <strong>{"Paola Smith"}</strong>
          </span>
          <div className="icones">
            <i class="fa-solid fa-circle-user"></i>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
      
    </header>
  );
}
