import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ConfirmacaoPedido() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("cliente") || (!sessionStorage.getItem("idPedido") || sessionStorage.getItem("idPedido") === 0 )) {
      navigate("/");
    }
  }, [navigate]);
  
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const idPedido = sessionStorage.getItem("idPedido");

  return (
    <div className="pagina-confirmacao-pedido pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <main className="confirmacao-pedido">
          <div className="banner">
            <h1>Confirmação do Pedido</h1>
          </div>

          <div className="recibo-pedido">
            <div className="informacoes">
              <div className="mensagem-confirmacao-pedido">
                <i class="fa-solid fa-circle-check"></i>
                <h3>Pedido Confirmado</h3>
                <span>Pedido Nº {idPedido}</span>

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

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
