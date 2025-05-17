import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function Vinho(props) {
  const navigate = useNavigate();
  
  return (
    <section className="componente-vinho">
      <div className="imagem-vinho">
        <img
          src={props.vinhos.imagem_vinho ?? "/assets/images/vinho-exemplo.svg"}
          style={{width: props.vinhos.imagem_vinho ? "60%" : "38%"}}
          alt="imagem vinho"
        />
      </div>
      <div className="informacoes-vinho">
        <h5>{props.vinhos.nome_vinho ?? "Vinho"}</h5>
        <span>{props.vinhos.classificacao_vinho ?? "Classificação"}</span>
        <p className="preco">R$ {props.vinhos.preco_vinho ?? "0.0"}</p>
        <button className="btn-reserva-vinho" onClick={() => navigate(`/vinho/${props.vinhos.id_vinho}`)}>Reservar</button>
      </div>
    </section>
  );
}
