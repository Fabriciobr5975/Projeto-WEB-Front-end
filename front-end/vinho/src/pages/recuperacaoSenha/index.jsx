import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import InputPadrao from "../../components/inputPadrao";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validarEmail from "../../service/validacaoCampos/validacaoCampoEmail";

export default function RecuperacaoSenha() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  return (
    <div className="pagina-recuperacao-senha pagina">
      <TelaCarregamento tempo={250}>
        <Header/>

        <div className="recuperacao-senha">
          <span>Recuperação de Senha</span>

          <div className="campos-entrada">
            <p className="informacao-campos-entrada">Insira abaixo o e-mail utilizado no cadastro da conta</p>
            <div className="campo-email">
              <InputPadrao
                tipoCampo="email"
                bordaDinamica={email.length >= 1}
                campoValido={validarEmail(email)}
                labelCampo="E-mail:"
                placeholder="Digite o E-Mail para a recuperação da senha"
                valor={email}
                setValor={setEmail}
                tamanhoMaximo={100}
                requerido={true}
              />
              <button className="botao">Enviar</button>
            </div>
            <div className="campo-codigo">
              <label>Digite o Código Recebido Via E-Mail: </label>
              <input
                type="number"
                placeholder="Exemplo: 123456"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)
                }
                minLength={1}
                maxLength={6}
                required
              />
            </div>
          </div>
          <button className="botao" id="botao-recuperar-senha" onClick={() => navigate("/alterarsenha")}>
            Recuperar Senha
          </button>
        </div>

        <Footer/>
      </TelaCarregamento>
    </div>
  );
}
