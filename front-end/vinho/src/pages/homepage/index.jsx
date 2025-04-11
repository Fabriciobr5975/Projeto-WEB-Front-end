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
        <div className="img-sobre-nos">
          <div id="imagem"></div>
        </div>

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
          <hr />
        </div>

        <div className="categoria-vinho">
          <div className="categoria tinto"></div>
          <div className="categoria rose"></div>
          <div className="categoria branco"></div>
        </div>
      </section>

      <section className="produtos">
        <div className="subtitulos">
          <h2>VINHOS MAIS VENDIDOS</h2>
          <hr />
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

      <section className="disclaimer">
        <Disclaimer />
      </section>

      <Footer />
    </div>
  );
}
