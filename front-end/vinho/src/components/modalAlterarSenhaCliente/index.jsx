import "./index.scss";

import InputSenha from "../inputSenha";

import { useState } from "react";
import axios from "axios";

export default function ModalAlterarSenhaCliente(props) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const validarCampos = () => {
    let validacao = true;

    if (!senhaAtual) {
      alert(
        "A senha atual é obrigatória é deve ser a mesma cadastrada no sistema"
      );
      validacao = false;
    } else if (!novaSenha) {
      alert("Digite a nova senha!");
      validacao = false;
    } else if (!confirmarNovaSenha) {
      alert("Confirme a nova senha!");
      validacao = false;
    } else if (novaSenha !== confirmarNovaSenha) {
      alert("A nova senha e a confirmação não coincidem!");
      validacao = false;
    }

    return validacao;
  };

  const alterarSenha = async () => {
    try {
      const url = `http://localhost:5001/cliente/senha/${props.cliente}`;
     
      if (!validarCampos()) {
        return;
      }

      const resp = await axios.put(url, {
        senha: senhaAtual,
        novaSenha: novaSenha,
      });

      if (resp.data.resposta >= 1) {
        alert("Sua senha foi alterada com sucesso!");
        props.fecharModal();
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar a senha");
    }
  };

  return (
    <section className="modal-alteracao-senha-cliente">
      <div className="conteudo-modal">
        <div className="cabecalho-modal-alteracao-senha-cliente">
          <h2>Alterar Sua Senha</h2>
          <i class="fa-regular fa-circle-xmark" onClick={props.fecharModal}></i>
        </div>
        <div className="conteudo-alteracao-senha-cliente">
          <div className="entrada-dados">
            <InputSenha
              labelCampo="Senha Atual:"
              setSenha={setSenhaAtual}
              placeholder="Digite sua senha atual"
            />
            <InputSenha
              labelCampo="Nova Senha:"
              setSenha={setNovaSenha}
              placeholder="Digite a nova senha"
            />
            <InputSenha
              labelCampo="Confirmar Nova Senha:"
              setSenha={setConfirmarNovaSenha}
              placeholder="Confirme a nova senha"
            />
          </div>
          <div className="botao-alteracao-senha">
            <button onClick={alterarSenha}>Alteração da Senha</button>
          </div>
        </div>
      </div>
    </section>
  );
}
