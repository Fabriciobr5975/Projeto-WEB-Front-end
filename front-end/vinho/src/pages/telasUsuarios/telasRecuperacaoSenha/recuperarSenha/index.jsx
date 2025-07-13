import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";
import InputSenha from "../../../../components/componentesPrincipais/inputs/inputSenha";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validarSenha from "../../../../service/validacaoCampos/validacaoCampoSenha";
import axios from "axios";

export default function RecuperarSenha() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const validarCampos = () => {
    let validacao = true;

    if (!novaSenha) {
      alert("Digite a nova senha!");
      validacao = false;
    } else if (!confirmarNovaSenha) {
      alert("Confirme a nova senha!");
      validacao = false;
    } else if (!validarSenha(novaSenha)) {
      alert(
        "A senha passada não atende aos critérios para a alteração da senha"
      );
      validacao = false;
    } else if (novaSenha !== confirmarNovaSenha) {
      alert("A nova senha e a confirmação não coincidem!");
      validacao = false;
    }

    return validacao;
  };

  const alterarSenha = async () => {
    /**
     * Esse método não tem função real, como não há a parte de geração do código esse método
     * fica de exemplo para futuras atualizações.
     */
    try {
      const url = `http://localhost:5001/cliente/recuperarsenha/${0}`;

      if (!validarCampos()) {
        return;
      }

      const resp = await axios.put(url, {
        novaSenha: novaSenha,
      });

      if (resp.data.resposta >= 1) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar a senha");
    }
  };

  return (
    <div className="pagina-alterar-senha-cliente pagina">
      <TelaCarregamento tempo={250}>
        <Header />
        <div className="alteracao-senha">
          <span>Alteração da Senha</span>

          <div className="campos-entrada">
            <p className="informacao-campo-entrada">
              Insira a sua nova senha e a confirme logo em baixo!
            </p>
            <div className="campo-senha">
              <InputSenha
                bordaDinamica={novaSenha.length >= 1}
                labelCampo="Senha:"
                setSenha={setNovaSenha}
                placeholder="Digite sua senha"
                habilitarCampoSenhaValido={true}
              />
            </div>
            <div className="campo-senha">
              <InputSenha
                bordaDinamica={confirmarNovaSenha.length >= 1}
                labelCampo="Confirme a nova Senha:"
                setSenha={setConfirmarNovaSenha}
                placeholder="Digite sua senha"
              />
            </div>
          </div>
          <button
            className="botao"
            id="botao-recuperar-senha"
            onClick={() => alterarSenha()}
          >
            Recuperar Senha
          </button>
        </div>
        <Footer />
      </TelaCarregamento>
    </div>
  );
}
