import { useState } from "react";
import "./index.scss";

import { Link } from "react-router-dom";

export default function Footer(props) {
  const [clienteEspecial] = useState(props.cliente?.acesso);

  const [emailUsuario, setEmailUsuario] = useState("");

  const teclaEnterApertada = (e) => {
    if (e.key === "Enter") {
      enviarEmailUsuario();
    }
  };

  const enviarEmailUsuario = () => {
    if (!emailUsuario) {
      alert("Por favor, digite o seu E-mail!");
      return;
    }
    alert(`Obrigado pela inscrição, você receberá um E-mail em breve!`);
    setEmailUsuario("");
  };

  return (
    <footer className="footer">
      <div className="elementos-footer">
        <div className="mapa-navegacao-footer">
          <h3 className="subtitulos-footer">VIANA VINHOS</h3>
          <Link to="/">Home</Link>
          <Link to="/sobrenos">Sobre Nós</Link>

          <Link to={props.cliente?.primeiro_nome ? "/perfil" : "/cadastro"}>
            {props.cliente?.primeiro_nome ? "Meu Dados" : "Cadastre-se"}
          </Link>
          <Link
            to="/listagemprodutos"
            style={{ display: clienteEspecial ? "" : "none" }}
            id="link-tela-adm"
          >
            <i class="fas fa-key"></i> Administrador
          </Link>
        </div>

        <div className="vinho-footer">
          <h3 className="subtitulos-footer">VINHOS</h3>
          <Link to="/produtos?classificacao=Espumante">Espumante</Link>
          <Link to="/produtos?classificacao=Frisante">Frisante</Link>
          <Link to="/produtos?classificacao=Rose">Rosé</Link>
          <Link to="/produtos?classificacao=Fortificado">Fortificado</Link>
          <Link to="/produtos?classificacao=Seco">Seco</Link>
          <Link to="/produtos?classificacao=Demi-sec">Demi-sec</Link>
          <Link to="/produtos?classificacao=Suave">Suave</Link>
        </div>

        <div className="ajuda-footer">
          <h3 className="subtitulos-footer">AJUDA</h3>
          <Link to="/perguntas-frequentes">Perguntas Frequentes</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
          <Link to="/politica-devolucao">Política de Devoluções</Link>
        </div>

        <div className="conteudo-adicional-footer">
          <div className="email-footer">
            <h3 className="subtitulos-footer">RECEBA NOVIDADES VIA E-MAIL</h3>
            <div className="input-email-footer">
              <input
                type="email"
                placeholder="seu.email@aqui.com"
                className="input-footer"
                value={emailUsuario}
                onKeyUp={teclaEnterApertada}
                onChange={(e) => setEmailUsuario(e.target.value)}
              />
              <button onClick={() => enviarEmailUsuario()}>Confirmar</button>
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
