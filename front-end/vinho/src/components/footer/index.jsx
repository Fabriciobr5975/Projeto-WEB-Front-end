import "./index.scss";

import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <footer className="footer">
      <div className="elementos-footer">
        <div className="mapa-navegacao-footer">
          <h3 className="subtitulos-footer">VIANA VINHOS</h3>
          <Link to="/" >Home</Link>
          <Link to="/sobrenos" >Sobre Nós</Link>
          <Link to="/nossahistoria" >Nossa História</Link>
          <Link to="guiadevinhos" >Guia de Vinhos</Link>
        </div>

        <div className="vinho-footer">
          <h3 className="subtitulos-footer">VINHOS</h3>
          <Link to="" >Tinto</Link>
          <Link to="" >Branco</Link>
          <Link to="" >Espumante</Link>
          <Link to="" >Rosé</Link>
          <Link to="" >Mais Vendidos</Link>
          <Link to="" >Em Promoção</Link>
          <Link to="" >Guia de Vinhos</Link>
        </div>

        <div className="ajuda-footer">
          <h3 className="subtitulos-footer">AJUDA</h3>
          <Link to="" >Contate-nos</Link>
          <Link to="" >Perguntas Frequentes</Link>
          <Link to="" >Política de Privacidade</Link>
          <Link to="" >Política de Privacidade</Link>
          <Link to="" >Política de Cancelamento</Link>
          <Link to="" >Informações sobre Entrega</Link>
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
