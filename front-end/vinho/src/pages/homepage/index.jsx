import "./index.scss";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="pagina-principal pagina">
      <header className="header">
        <div className="elementos-header">
          <div>
            <img src="" alt="" className="logo" />
          </div>

          <div className="input-header">
            <input
              type="text"
              placeholder="Search Your itens here..."
              className="campo-busca-homepage"
            />
          </div>

          <div className="dados-usuario-header">
            <span>
              Welcome, <strong>Paola Smith</strong>
            </span>
            <i class="fa-solid fa-circle-user icone"></i>
            <i class="fa-solid fa-cart-shopping icone"></i>
          </div>
        </div>
      </header>

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
        <div id="titulo-categoria">
          <h2>PRINCIPAIS CATEGORIAS</h2>
          <hr />
        </div>

        <div className="categoria-vinho">
          <div className="categoria tinto"></div>
          <div className="categoria rose"></div>
          <div className="categoria branco"></div>
        </div>
      </section>

      <section className="vinhos-mais-procurados"></section>

      <section className="informacoes-adicionais"></section>

      <footer className="footer">
        <div className="elementos-footer">
          <div className="mapa-navegacao-footer">
            <h3 className="subtitulos-footer">VIANA VINHOS</h3>
            <Link className="links-footer">Home</Link>
            <Link className="links-footer">Sobre Nós</Link>
            <Link className="links-footer">Nossa História</Link>
            <Link className="links-footer">Guia de Vinhos</Link>
          </div>

          <div className="vinho-footer">
            <h3 className="subtitulos-footer">VINHOS</h3>
            <Link className="links-footer">Tinto</Link>
            <Link className="links-footer">Branco</Link>
            <Link className="links-footer">Espumante</Link>
            <Link className="links-footer">Rosé</Link>
            <Link className="links-footer">Mais Vendidos</Link>
            <Link className="links-footer">Em Promoção</Link>
            <Link className="links-footer">Guia de Vinhos</Link>
          </div>

          <div className="ajuda-footer">
            <h3 className="subtitulos-footer">AJUDA</h3>
            <Link className="links-footer">Contate-nos</Link>
            <Link className="links-footer">Perguntas Frequentes</Link>
            <Link className="links-footer">Política de Privacidade</Link>
            <Link className="links-footer">Política de Privacidade</Link>
            <Link className="links-footer">Política de Cancelamento</Link>
            <Link className="links-footer">Informações sobre Entrega</Link>
          </div>

          <div className="conteudo-adicional-footer">
            <div className="email-footer">
              <h3 className="subtitulos-footer">RECEBA NOVIDADES VIA E-MAIL</h3>
              <input type="email" placeholder="seu.email@aqui.com" />
            </div>

            <div className="contato-footer">
              <h3 className="subtitulos-footer">CONTATO</h3>
            </div>

            <div className="midia-social-footer">
              <h3 className="subtitulos-footer">MÍDIA SOCIAL</h3>
            </div>
          </div>
        </div>

        <div className="direitos-reservados">
          <hr className="barra-horizontal" />
          <span id="mensagem-direitos-reservados">
            2025 VIANA VINHOS - Direitos Reservados
          </span>
        </div>
      </footer>
    </div>
  );
}
