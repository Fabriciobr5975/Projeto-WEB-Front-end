import { useState } from "react";
import "./index.scss";

import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="elementos-header">
        <picture className="logo">
          <img src="/assets/images/logo.svg" alt="Logo" onClick={() => navigate("/")} />
        </picture>

        <div className="links-header">
          <ul className="lista-links-header">
            <li>
              <Link to="/vinhos">Vinho</Link>
            </li>
            <li>
              <Link to="/vicolas">Vinicola</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div className="dados-usuario-header">
          <span>
            Welcome, <strong>{props.cliente?.nome_completo || "Visitante"}</strong>
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
