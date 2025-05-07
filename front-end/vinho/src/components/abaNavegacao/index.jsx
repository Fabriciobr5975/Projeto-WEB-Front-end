import "./index.scss";

import { Link, useLocation } from "react-router-dom";

export default function AbaNavegacao(props) {
  const location = useLocation();
  const { cliente } = location.state || {};

  return (
    <div className="comp-aba-navegacao">
      <Link to={props.navegacao ?? "/notfound"} className="navegacao" state={{cliente}} >
        <span style={{ fontWeight: props.abaAtual ? "Bolder" : "inherit" }}>
          {props.nome ?? "Aba"}
        </span>
      </Link>
    </div>
  );
}
