import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function RecuperacaoSenha() {
  const location = useLocation();
  const { cliente } = location.state || {};

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  return (
    <div className="pagina-recuperacao-senha pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <div className="recuperacao-senha">
          <span>Recuperação de Senha</span>

          <div className="campos-entrada">
            <p>Insira abaixo o e-mail utilizado no cadastro da conta</p>
            <div className="campo-email">
              <label>E-Mail: </label>
              <input
                type="text"
                placeholder="Digite o E-Mail para a recuperação da senha"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="botao">Enviar</button>
            </div>
            <div className="campo-codigo">
              <label>Código Recebido Via E-Mail: </label>
              <input
                type="text"
                placeholder="Digite o Código recebido pelo E-Mail"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
          </div>
          <button className="botao" id="botao-recuperar-senha">
            Recuperar Senha
          </button>
        </div>

        <Footer cliente={cliente}/>
      </TelaCarregamento>
    </div>
  );
}
