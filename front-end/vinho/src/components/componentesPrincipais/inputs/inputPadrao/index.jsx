import "./index.scss";

export default function InputPadrao(props) {
  return (
    <div className="formatacao-input-geral">
      <div className="cabecalho-campo">
        <label>{props?.labelCampo ?? "Campo"}</label>
      </div>

      <div
        className="input-padrao"
        style={
          props.bordaDinamica
            ? props.campoValido
              ? { borderColor: "#1BAC01" }
              : { borderColor: "#FD0B0B" }
            : { borderColor: "#000" }
        }
      >
        <input
          type={props.tipoCampo ?? "text"}
          style={props.apenasLeitura ? { background: "#D6D5D5" } : {}}
          placeholder={props.placeholder ?? "Campo"}
          value={props.valor ?? ""}
          onChange={(e) => props.setValor(e.target.value)}
          min={props.valorMinimo ?? 0}
          max={props.valorMaximo ?? Number.MAX_SAFE_INTEGER}
          minLength={props.tamanhoMinimo ?? 1}
          maxLength={props.tamanhoMaximo ?? 100}
          required={props.requerido ?? false}
          readOnly={props.apenasLeitura ?? false}
        />
      </div>
    </div>
  );
}
