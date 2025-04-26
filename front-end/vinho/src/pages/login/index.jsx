import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="pagina-login pagina">
      <Header />

      <div className="login">
        <div className="login-usuario">
          <span>Login do usuário</span>

          <div className="campos-entrada">
            <div className="campo-email">
              <label>E-mail: </label>
              <input
                type="text"
                placeholder="Digite seu E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="campo-senha">
              <label>Senha: </label>
              <input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <Link to="/recuperacaosenha">Esqueci minha senha</Link>
          </div>
          <div className="campo-botoes">
            <div className="botoes">
              <button onClick={() => navigator("/")}>Entrar</button>
              <p>Ainda não tem uma conta? Crie uma agora mesmo!</p>
              <button onClick={() => navigator("/cadastrar-se")}>
                Cadastra-se
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
