import "./index.scss";

import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
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
            <input type="email" placeholder="seu.email@aqui.com" className="input-footer"/>
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
  );
}
