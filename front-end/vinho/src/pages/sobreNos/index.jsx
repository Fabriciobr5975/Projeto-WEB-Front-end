import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
//import Banner from "../../components/banner";

export default function SobreNos() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  return (
    <div className="pagina-sobre-nos pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <main className="sobre-nos">
          <div className="banner-sobre-nos">
            <h1>Sobre Nós</h1>
          </div>

          <div className="conteudo-sobre-nos">
            <div className="informacoes">
              <picture className="logo">
                <img
                  src="/assets/images/imagem-pagina-sobre-nos.svg"
                  alt="Imagem Sobré Nós"
                />
              </picture>

              <div className="texto">
                <h2>Origem</h2>
                <hr className="barra-informacoes" />
                <p>
                  A empresa Viana Vinhos Finos foi criada em 1992. Representante
                  Ronilton de Melo Viana. A empresa tem como objetivo atender as
                  pessoas que apreciam um bom vinho. Nossos parceiros
                  profissionais: Vinícola Gões e Vinícola XV de Novembro. Os
                  nossos serviços vão desde o consumo cotidiano até os brindes
                  promocionais. Descubra rótulos exclusivos e experiências
                  únicas na loja que é referência entre os amantes do bom vinho.
                </p>
              </div>
            </div>

            <div className="informacoes-adicionais">
              <div className="missao">
                <i class="fa-solid fa-bullseye"></i>
                <h2>Missão</h2>
                <p>
                  Disseminar a paixão pelo vinho conectando as pessoas as
                  historias e a cultura que cada garrafa carrega
                </p>
              </div>

              <div className="visao">
                <i class="fa-solid fa-eye"></i>
                <h2>Visão</h2>
                <p>
                  Ser o principal destino para os amantes do vinho, oferecendo
                  uma experiência completa que une conhecimento, prazer e
                  acessibilidade
                </p>
              </div>

              <div className="valores">
                <i class="fa-regular fa-gem"></i>
                <h2>Valores</h2>
                <p>
                  <strong>Paixão pelo Vinho:</strong> Compartilhamos o
                  entusiasmo e a curiosidade que nos inspiram a explorar o mundo
                  do vinho e a transmitir esse conhecimento aos nossos clientes.
                </p>
                <p>
                  <strong>Qualidade e Autenticidade:</strong> Priorizamos a
                  excelência em todos os aspectos desde a seleção dos vinhos até
                  o atendimento personalizado, garantindo uma experiência
                  autêntica e memorável.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer cliente={cliente}/>
      </TelaCarregamento>
    </div>
  );
}
