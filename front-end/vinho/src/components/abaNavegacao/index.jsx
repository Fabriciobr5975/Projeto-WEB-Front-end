import "./index.scss";

export default function AbaNavegacao(props) {
  return (
    <div className="comp-aba-navegacao">
      <span style={{ fontWeight: props.abaAtual ? "Bolder" : "inherit" }}>
        {props.nome ?? "Aba"}
      </span>
    </div>
  );
}
