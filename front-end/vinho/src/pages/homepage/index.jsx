import Header from "../../components/header";
import Footer from "../../components/footer";
import Vinho from "../../components/vinho";
import Disclaimer from "../../components/disclaimer";

import "./index.scss";

export default function HomePage() {
  return (
    <div className="pagina-principal pagina">
      <Header />

      <main className="banner">
        <div className="informacao-banner">
          <h2>CELEBRANDO 33 ANOS DE PAIXÃO PELO VINHO</h2>
          <p>
            Personalize seu vinho conosco. Pode ser datas como: aniversários,
            lembrancinhas de casamento, até personalização da sua empresa, para
            brindes de fim de ano.
          </p>
        </div>
      </main>

      <section className="sobre-nos">
        <picture className="img-sobre-nos">
          <img
            src="/assets/images/imagem-sobre-nos.svg"
            alt="Imagem Sobre Nós"
          />
        </picture>

        <div className="informacao-sobre-nos">
          <h2>NOSSA JORNADA</h2>
          <hr />
          <p>
            A empresa Viana Vinhos Finos foi criada em 1992. Representante
            Ronilton de Melo Viana.
          </p>
          <p>
            A empresa tem como objetivo atender as pessoas que apreciam um bom
            vinho. Nossos parceiros profissionais: Vinícola Gões e Vinícola XV
            de Novembro.
          </p>
          <p>
            Os nossos serviços vão desde o consumo cotidiano até os brindes
            promocionais.
          </p>
          <p>
            Descubra rótulos exclusivos e experiências únicas na loja que é
            referência entre os amantes do bom vinho.
          </p>
        </div>
      </section>

      <section className="principais-categorias">
        <div class="subtitulos">
          <h2>PRINCIPAIS CATEGORIAS</h2>
          <hr className="barra-categorias"/>
        </div>

        <div className="categoria-vinho">
        <picture className="categoria tinto">
          <img
            src="/assets/images/classificao-vinhos/Tinto.svg"
            alt="Categoria Tinto"
          />
        </picture>
        <picture className="categoria rose">
          <img
            src="/assets/images/classificao-vinhos/Rose.svg"
            alt="Categoria Rose"
          />
        </picture>
        <picture className="categoria branco">
          <img
            src="/assets/images/classificao-vinhos/Branco.svg"
            alt="Categoria Branco"
          />
        </picture>
        
        </div>
      </section>

      <section className="produtos">
        <div className="subtitulos">
          <h2>VINHOS MAIS VENDIDOS</h2>
          <hr className="barra-vinhos" />
          <p>Confira os vinhos mais vendidos e faça uma reserva</p>
        </div>

        <div className="secao-vinhos">
          <div className="secao01-vinho">
            <Vinho />
            <Vinho />
            <Vinho />
            <Vinho />
          </div>

          <div className="secao02-vinho">
            <Vinho />
            <Vinho />
            <Vinho />
            <Vinho />
          </div>
        </div>

        <div className="confira-mais">
          <span>Confira Mais</span>
          <hr></hr>
        </div>
      </section>

      <Disclaimer />

      <Footer />
    </div>
  );
}
