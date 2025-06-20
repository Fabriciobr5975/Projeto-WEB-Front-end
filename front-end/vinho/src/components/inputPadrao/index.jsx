import "./index.scss";

import { useState } from "react";
import validarEmail from "../../service/validacaoCampos/validacaoCampoEmail";

export default function InputPadrao(props) {
  const [emailValido, setEmailValido] = useState(false);

  const alterarValorCampo = (e) => {
    const valor = e.target.value;

    if (props?.tipoCampo === "email") {
      setEmailValido(validarEmail(valor));
    }

    props?.setValor(valor);
  };

  const colocarCorNasBordasParaEmail = () => {
    return props?.tipoCampo === "email";
  };

  return (
    <div className="formatacao-input-geral">
      <div className="cabecalho-campo">
        <label>{props?.labelCampo ?? "Campo"}</label>
      </div>

      <div
        className="input-padrao"
        style={
          colocarCorNasBordasParaEmail()
            ? emailValido ? {borderColor: "#1BAC01"} :  { borderColor: "#FD0B0B" }
            : { borderColor: "#000" }
        }
      >
        <input
          type={props?.tipoCampo ?? "text"}
          style={props?.apenasLeitura ? { background: "#d0d0d0" } : {}}
          placeholder={props?.placeholder ?? "Campo"}
          value={props?.valor ?? ""}
          onChange={(e) => alterarValorCampo(e)}
          minLength={props?.tamanhoMinimo ?? 1}
          maxLength={props?.tamanhoMaximo ?? 100}
          required={props?.requerido ?? false}
          readOnly={props?.apenasLeitura ?? false}
        />
      </div>
    </div>
  );
}
