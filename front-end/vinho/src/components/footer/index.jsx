import "./index.scss";

import { Link, useLocation } from "react-router-dom";

export default function Footer(props) {
  const location = useLocation();
  const { cliente } = location.state || {};

  return (
    <footer className="footer">
      <div className="elementos-footer">
        <div className="mapa-navegacao-footer">
          <h3 className="subtitulos-footer">VIANA VINHOS</h3>
          <Link to="/" state={{ cliente }}>
            Home
          </Link>
          <Link to="/sobrenos" state={{ cliente }}>
            Sobre Nós
          </Link>
          <Link to="/nossahistoria" state={{ cliente }}>
            Nossa História
          </Link>
        </div>

        <div className="vinho-footer">
          <h3 className="subtitulos-footer">VINHOS</h3>
          <Link to="/produtos" state={{ cliente }}>
            Tinto
          </Link>
          <Link to="/produtos" state={{ cliente }}>
            Branco
          </Link>
          <Link to="/produtos" state={{ cliente }}>
            Espumante
          </Link>
          <Link to="/produtos" state={{ cliente }}>
            Rosé
          </Link>
          <Link to="/produtos" state={{ cliente }}>
            Mais Vendidos
          </Link>
          <Link to="/produtos" state={{ cliente }}>
            Em Promoção
          </Link>
        </div>

        <div className="ajuda-footer">
          <h3 className="subtitulos-footer">AJUDA</h3>
          <Link to="contato" state={{ cliente }}>
            Contate-nos
          </Link>
          <Link to="informacoes" state={{ cliente }}>
            Perguntas Frequentes
          </Link>
          <Link to="politicas" state={{ cliente }}>
            Política de Privacidade
          </Link>
          <Link to="politicas" state={{ cliente }}>
            Política de Privacidade
          </Link>
          <Link to="politicas" state={{ cliente }}>
            Política de Cancelamento
          </Link>
        </div>

        <div className="conteudo-adicional-footer">
          <div className="email-footer">
            <h3 className="subtitulos-footer">RECEBA NOVIDADES VIA E-MAIL</h3>
            <div className="input-email-footer">
              <input
                type="email"
                placeholder="seu.email@aqui.com"
                className="input-footer"
              />
              <button>Confirmar</button>
            </div>
          </div>

          <div className="contato-footer">
            <h3 className="subtitulos-footer">CONTATO</h3>
            <div className="contato">
              <i class="fa-brands fa-whatsapp whatsapp"></i>
              <span>(11) 95100-3733</span>
            </div>
          </div>

          <div className="midia-social-footer">
            <h3 className="subtitulos-footer">MÍDIA SOCIAL</h3>
            <div className="redes-sociais">
              <i class="fa-brands fa-facebook facebook"></i>
              <i class="fa-brands fa-instagram instagram"></i>
            </div>
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
