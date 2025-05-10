import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TelaCarregamento from "../../components/telaCarregamento";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const buscarCliente = async () => {
    try {
      if (validarCampos()) {
        const url = `http://localhost:5001/cliente/busca/email?email=${email}`;

        const resp = await axios.get(url);

        const clienteValido = resp.data.find(
          (clienteBusca) =>
            clienteBusca.email === email && clienteBusca.senha === senha
        );

        if (clienteValido) {
          alert(
            `Login realizado com sucesso! Logado como ${clienteValido.primeiro_nome} ${clienteValido.sobrenome}`
          );
          sessionStorage.setItem("cliente", JSON.stringify(clienteValido));
          navigate("/homepage");
          
        } else {
          alert("O usuário não foi encontrado!");
        }
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao validar as credenciais");
    }
  };

  const validarCampos = () => {
    if (!email || email === "") {
      alert("O Campo do email é obrigatório e deve ser preenchido");
      return false;
    }

    if (!senha || senha === "") {
      alert("O Campo da senha é obrigatório e deve ser preenchido");
      return false;
    }

    return true;
  };

  const teclaEnterApertada = (e) => {
    if (e.key === "Enter") {
      buscarCliente();
    }
  };

  return (
    <div className="pagina-login pagina">
      <TelaCarregamento tempo={250}>
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
                  onKeyUp={teclaEnterApertada}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="campo-senha">
                <label>Senha: </label>
                <input
                  type="password"
                  placeholder="Digite sua Senha"
                  value={senha}
                  onKeyUp={teclaEnterApertada}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <Link to="/recuperacaosenha">Esqueci minha senha</Link>
            </div>
            <div className="campo-botoes">
              <div className="botoes">
                <button onClick={buscarCliente}>Entrar</button>
                <p>Ainda não tem uma conta? Crie uma agora mesmo!</p>
                <button onClick={() => navigate("/cadastro")}>
                  Cadastra-se
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </TelaCarregamento>
    </div>
  );
}
