import "./index.scss";

import { imprimirNumeroComVirgula } from "../../utils/conversaoUtil";

export default function DetalhesDoPedido(props) {
  return (
    <section className="modal-informacoes-pedido">
      <div className="conteudo-modal">
        <div className="cabecalho-modal-informacao-pedido">
          <h2>Visualização do Pedido</h2>
          <i class="fa-regular fa-circle-xmark" onClick={props.fecharModal}></i>
        </div>
        <div className="conteudo-informacoes-pedido">
          <div className="informacao-principal-pedido">
            <div className="identificacao-pedido">
              <h4>Pedido #{props.pedido.id_pedido}</h4>
              <hr />
              <h4>Realizado em {props.pedido.data_pedido}</h4>
            </div>
            <span
              className="status-entrega-pedido"
              style={
                props.pedido.status_pedido === "ENTREGUE"
                  ? { color: "#00a650" }
                  : { color: "#DF8803" }
              }
            >
              {props.pedido.status_pedido}
            </span>
          </div>

          {props.pedido.itens.map((item) => (
            <div className="informacoes-vinho-pedido" key={item.id_vinho}>
              <div className="imagem-vinho">
                <img src={item.imagem_vinho} alt="imagem vinho" />
              </div>

              <div className="vinho-pedido">
                <span>{item.vinho}</span>
                <span>País de origem: {item.pais_vinho}</span>
                <span>Vinícola: {item.vinicola_vinho}</span>
                <span>Classificação: {item.classificao_vinho}</span>
                <span>Qtd Comprada: {item.quantidade}</span>
                <span>
                  Preço un. R${" "}
                  {imprimirNumeroComVirgula(
                    Number(item.preco_vinho).toFixed(2)
                  )}
                </span>
              </div>
            </div>
          ))}

          <div className="informacoes-endereco-pedido">
            <h3>Endereço de Entrega</h3>

            <div className="endereco-entrega-pedido">
              <span>
                <b>Endereco:</b>{" "}
                {props.pedido.endereco +
                  ", " +
                  props.pedido.cep +
                  ", nº " +
                  props.pedido.numero +
                  ", " +
                  props.pedido.bairro}
              </span>
              <span>
                <b>Localidade: </b>{" "}
                {props.pedido.localidade + " - " + props.pedido.uf}
              </span>
              <span>
                <b>Complemento</b>: {props.pedido.complemento}
              </span>
            </div>
          </div>

          <div className="preco-total-pedido">
            <span>
              Total R${" "}
              {imprimirNumeroComVirgula(
                Number(props.pedido.preco_total_pedido).toFixed(2)
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
