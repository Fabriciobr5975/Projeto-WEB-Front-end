import "./index.scss";

export default function Disclaimer(props) {
  return (
    <section className="componente-disclaimer">
      <div className="informacoes-disclaimer">
        <div className="seguranca">
          <div className="cabecalho">
            <i class="fa-solid fa-lock"></i>
            <span>Segurança</span>
          </div>
          <div className="texto-disclaimer">
            <p>Suas Compras 100% Seguras</p>
          </div>
        </div>

        <div className="frete-gratis">
          <div className="cabecalho">
            <i class="fa-solid fa-truck"></i>
            <span>Frete Grátis</span>
          </div>
          <div className="texto-disclaimer">
            <p>Receba seus vinhos no conforto de sua casa</p>
          </div>
        </div>

        <div className="desconto">
          <div className="cabecalho">
            <i class="fa-solid fa-tag"></i>
            <span>Obtenha Descontos</span>
          </div>
          <div className="texto-disclaimer">
            <p>Comprando no pix em produto selecionados</p>
          </div>
        </div>
      </div>
    </section>
  );
}
