import Header from "../../components/header";
import Footer from "../../components/footer";

import { Link } from "react-router-dom";

import "./index.scss";

export default function Login() {
  return (
    <div className="pagina-login pagina">
      <Header />

      <div className="login-usuario">
        <span>Login do usuário</span>

        <div className="campos-entrada">
          <div className="campo-email">
            <label>E-Mail: </label>
            <input type="text" placeholder="Digite seu E-Mail" />
          </div>
          <div className="campo-senha">
            <label>Senha: </label>
            <input type="text" placeholder="Digite sua Senha" />
          </div>
          <Link to="/recupersenha">Esqueci minha senha</Link>
        </div>
        <div className="botoes">
          <button>Entrar</button>   
          <p>Ainda não tem uma conta? Crie uma agora mesmo!</p>
          <button>Cadastra-se</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
