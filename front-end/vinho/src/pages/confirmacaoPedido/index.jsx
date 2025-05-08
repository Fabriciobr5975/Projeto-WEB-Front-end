import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function ConfirmacaoPedido() {
  return (
    <div className="pagina-confirmacao-pedido pagina">
      <TelaCarregamento tempo={250}>
        <Header />
        <main className="confirmacao-pedido">
          <div className="banner">
            <h1>Confirmação do Pedido</h1>
          </div>

          <div className="recibo-pedido">
            <div className="informacoes">
              <div className="mensagem-confirmacao-pedido">
                <i class="fa-solid fa-circle-check"></i>
                <h3>Pedido Confirmado</h3>
                <span>Pedido Nº 1234567</span>

                <div className="mensagem-recibo">
                  <div className="mensagem-agradecimento">
                    <p>
                      Agradecemos pela preferência! Enviaremos um e-mail com
                      todas as informações deste pedido para o e-mail cadastrado
                      em sua conta.
                    </p>
                  </div>

                  <div className="mensagem-final">
                    <p>
                      Lembre-se que você também pode acompanhar seu pedido
                      através da sua conta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </TelaCarregamento>
    </div>
  );
}
