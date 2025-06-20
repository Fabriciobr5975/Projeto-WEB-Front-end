import "./index.scss";

import { useState } from "react";
import validarSenha from "../../service/validacaoCampos/validacaoCampoSenha";

export default function InputSenha(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senhaValida, setSenhaValida] = useState(false);
  const [mostrarInfoSenhaValida, setMostrarInfoSenhaValida] = useState(false);

  const mostrarSenhaCampo = () => {
    setMostrarSenha(!mostrarSenha);
  };
  
  const alterarSenha = (e) => {
    const valor = e.target.value;
    setSenhaValida(validarSenha(valor));
    props?.setSenha(valor);
  };

  return (
    <div className="formatacao-input-senha">
      <div className="cabecalho-campo">
        <label>{props?.labelCampo ?? "Campo"}</label>

        {props?.habilitarCampoSenhaValido && (
          <i
            class="fa-solid fa-circle-info info-senha"
            onClick={() => setMostrarInfoSenhaValida((prev) => !prev)}
          ></i>
        )}
      </div>

      {mostrarInfoSenhaValida && (
        <div className="informacao-senha-valida">
          <h3>A senha Precisa:</h3>
          <p>Ter de 8 até 64 caracteres</p>
          <p>Ter pelo menos uma letra maiúscula</p>
          <p>Ter pelo menos um número</p>
          <p>
            Ter pelo menos um caractere especial (@, #, $, %, &, *, !, ou ?)
          </p>
        </div>
      )}

      <div
        className="input-senha"
        style={
          senhaValida ? { borderColor: "#1BAC01" } : { borderColor: "#FD0B0B" }
        }
      >
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder={props?.placeholder ?? "Campo"}
          onChange={(e) => alterarSenha(e)}
          minLength={8}
          maxLength={64}
          required
        />
        <i
          class={mostrarSenha ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
          onClick={mostrarSenhaCampo}
        ></i>
      </div>
    </div>
  );
}
