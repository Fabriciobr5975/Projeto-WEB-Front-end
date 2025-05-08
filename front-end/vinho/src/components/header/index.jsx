import "./index.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  const { cliente } = location.state || {};

  const navigate = useNavigate();

  const navegacao = () => {
    if (!props.cliente) {
      navigate("/login");
      return;
    }
    navigate("/perfil", {state: { cliente: cliente }});
  };

  return (
    <header className="header">
      <div className="elementos-header">
        <picture className="logo">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </picture>

        <div className="links-header">
          <ul className="lista-links-header">
            <li>
              <Link to="/vinho" className="link-header" state={{ cliente }}>Vinho</Link>
            </li>
            <li>
              <Link to="/vicolas" className="link-header" state={{ cliente }}>Vinicola</Link>
            </li>
            <li>
              <Link to="/contato" className="link-header" state={{ cliente }}>Contato</Link>
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
            <i
              class="fa-solid fa-cart-shopping"
              onClick={() => navigate("/meucarrinho")}
            ></i>
          </div>
        </div>
      </div>
    </header>
  );
}
