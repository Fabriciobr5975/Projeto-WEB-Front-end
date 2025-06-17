import { useState } from "react";
import "./index.scss";

import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const [clienteEspecial] = useState(props.cliente?.acesso);

  const navigate = useNavigate();

  const navegacao = () => {
    if (!props.cliente || !sessionStorage.getItem("cliente")) {
      navigate("/login");
      return;
    }
    navigate("/perfil");
  };

  return (
    <header className="header">
      <div className="elementos-header">
        <picture className="logo">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            onClick={() => navigate("/homepage")}
          />
        </picture>

        <div className="links-header">
          <ul className="lista-links-header">
            <li>
              <Link to="/produtos" className="link-header">
                Vinhos
              </Link>
            </li>
            <li>
              <Link to="/vinicolas" className="link-header">
                Vinícola
              </Link>
            </li>
            <li>
              {clienteEspecial ? (
                <Link
                  to="/listagemprodutos"
                  style={{ display: clienteEspecial ? "" : "none" }}
                  id="link-tela-adm"
                  className="link-header"
                >
                  <i class="fas fa-key"></i> Administrador
                </Link>
              ) : (
                <Link to="/sobrenos" className="link-header">
                  Sobre Nós
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="dados-usuario-header">
          <span>
            Olá,
            <strong> {props.cliente?.primeiro_nome || "Visitante"}</strong>
          </span>
          <div className="icones">
            <i class="fa-solid fa-circle-user" onClick={() => navegacao()}></i>
            {props?.cliente?.id_cliente &&
            <i
              class="fa-solid fa-cart-shopping"
              onClick={() => navigate("/meucarrinho")}
            ></i>
            }
          </div>
        </div>
      </div>
    </header>
  );
}
