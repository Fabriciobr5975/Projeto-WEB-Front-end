import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import InputPadrao from "../../components/inputPadrao";
import InputSenha from "../../components/inputSenha";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TelaCarregamento from "../../components/telaCarregamento";

import validarEmail from "../../service/validacaoCampos/validacaoCampoEmail";
import validarSenha from "../../service/validacaoCampos/validacaoCampoSenha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const buscarCliente = async () => {
    try {
      if (validarCampos()) {
        const url = `http://localhost:5001/cliente/busca/email?email=${email}&senha=${senha}`;

        const resp = await axios.get(url);

        const clienteValido = resp.data.find(
          (clienteBusca) => clienteBusca.email === email
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
    } else if (!validarSenha(senha)) {
      alert("A senha informada não contém todos os caracteres obrigatórios!");
    }

    if (!validarEmail(email)) {
      alert("O e-mail informado não contem os caracteres de um e-mail válido");
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
                <InputPadrao
                  tipoCampo="email"
                  labelCampo="E-mail:"
                  placeholder="Digite seu e-mail"
                  valor={email}
                  setValor={setEmail}
                  tamanhoMaximo={100}
                  requerido={true}
                />
              </div>
              <div className="campo-senha" onKeyUp={teclaEnterApertada}>
                <InputSenha
                  labelCampo="Senha:"
                  setSenha={setSenha}
                  placeholder="Digite sua senha"
                  habilitarCampoSenhaValido={true}
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
