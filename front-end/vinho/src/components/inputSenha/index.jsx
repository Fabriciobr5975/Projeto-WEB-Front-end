import "./index.scss";

import { useState } from "react";

export default function InputSenha(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const mostrarSenhaCampo = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="formatacao-input-senha">
      <label>{props?.labelCampo ?? "Campo"}</label>
      <div className="input-senha">
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder={props?.placeholder ?? "Campo"}
          onChange={(e) => props?.setSenha(e.target.value)}
        />
        <i class="fa-regular fa-eye-slash" onClick={mostrarSenhaCampo}></i>
      </div>
    </div>
  );
}
