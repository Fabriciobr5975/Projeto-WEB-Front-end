import "./index.scss";

import { Link } from "react-router-dom";

export default function AbaNavegacao(props) {
  return (
    <div className="comp-aba-navegacao">
      <Link to={props.navegacao ?? "/notfound"} className="navegacao">
        <span style={{ fontWeight: props.abaAtual ? "Bolder" : "inherit" }}>
          {props.nome ?? "Aba"}
        </span>
      </Link>
    </div>
  );
}
