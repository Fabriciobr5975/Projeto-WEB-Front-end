import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";
//import Banner from "../../components/banner";

export default function PoliticaDevolucao() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  return (
    <div className="pagina-devolucao pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <main className="conteudo-politica-devolucao">
          <div className="banner-politica-devolucao">
            <h1>Politicas de </h1>
            <h1>Trocas e Devoluções</h1>
          </div>
          <div className="informacoes">
            <div className="titulo-contexto">
              <div className="titulo">
                <strong>
                  <p>Devoluções </p>
                </strong>
                <div className="contexto">
                  <p>
                    O produto poderá ser devolvido em até 7 DIAS dias após o
                    recebimento do mesmo.
                  </p>
                  <p>
                    Caso você queira devolver o produto devido a mal-uso do
                    mesmo, nós não aceitaremos o produto de volta.
                  </p>
                  <p>
                    Para realizar a devolução você deve entrar em contato com o
                    nosso atendimento através do e-mail roni@vianavinhos.com ou
                    pelo telefone (11) 95100-3733.
                  </p>
                  <p>
                    Em caso de defeito de fabricação, para efetuar a devolução
                    de um produto você deve embalar o produto na embalagem
                    original e enviar para nós no seguinte endereço: Casa do
                    Roni, mas antes nos contate. Todos os custos oriundos do
                    envio do produto serão arcados por nós.
                  </p>
                  <p>
                    Lembrando que, de acordo com o Art. 49, o consumidor pode
                    desistir do contrato, no prazo de 7 dias a contar de sua
                    assinatura ou do ato de recebimento do produto ou serviço,
                    sempre que a contratação de fornecimento de produtos e
                    serviços ocorrer fora do estabelecimento comercial,
                    especialmente por telefone ou a domicílio.
                  </p>
                </div>
              </div>
              <div className="titulo">
                <strong>
                  <p>Trocas </p>
                </strong>
                <div className="contexto">
                  <p>
                    Após a devolução caso você tenha desejo em trocar um produto
                    você poderá escolher um produto de valor equivalente ou pela
                    soma de diferentes produtos cujo valor final seja
                    equivalente ao produto devolvido.
                  </p>
                  <p>
                    Para realizar a troca você deve entrar em contato com nosso
                    atendimento através do e-mail roni@vianavinhos.com ou pelo
                    telefone (11) 95100-3733.
                  </p>
                  <p>
                    A troca do produto será realizada em até 7 dias após o
                    recebimento do produto na nossa empresa.
                  </p>
                </div>
              </div>
              <div className="titulo">
                <strong>
                  <p>Reembolsos </p>
                </strong>
                <div className="contexto">
                  <p>Temos como formas de reembolso disponíveis:</p>
                  <div className="itens">
                    <p>- Depósito em conta</p>
                    <p>- Transferência bancária</p>
                  </div>

                  <p>
                    O método pelo qual o montante será devolvido depende da
                    forma como foi feito o pagamento, após o recebimento do
                    produto em nossa empresa o valor será restituído em:
                  </p>
                  <div className="itens">
                    <p>
                      - 2 dias para depósito em conta, após confirmação do
                      pagamento
                    </p>
                    <p>
                      - 2 dias para transferência bancária, após confirmação do
                      pagamento
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
