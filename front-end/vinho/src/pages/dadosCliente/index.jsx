import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";
import ModalAlterarSenhaCliente from "../../components/modalAlterarSenhaCliente";
import InputPadrao from "../../components/inputPadrao";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import validarCelular from "../../service/validacaoCampos/validacaoCampoCelular";

export default function PerfilCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [idCliente] = useState(cliente.id_cliente);
  const [abrirModal, setAbrirModal] = useState(false);

  const [dadosCliente, setDadosCliente] = useState({});

  const alterarDados = async () => {
    try {
      if (!validarCelular(dadosCliente.celular)) {
        alert("O celular passado não contém os digitos corretos");
        return;
      }
      const url = `http://localhost:5001/cliente/${idCliente}`;
      const resp = await axios.put(url, dadosCliente);

      const resposta = resp.data.resposta;

      if (resposta >= 1) {
        alert("Os seus dados foram alterados com sucesso!");
      }

      sessionStorage.setItem("cliente", JSON.stringify(dadosCliente));
      navigate(0);
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar o cliente");
    }
  };

  const confimarSaidaSite = () => {
    if (
      window.confirm(
        "Você está saindo da sua conta, clique em OK para continuar e realizar o logout"
      )
    ) {
      sessionStorage.removeItem("cliente");
      sessionStorage.removeItem("idPedido");
      navigate("/homepage");
    }
  };

  const buscarCliente = useCallback(async () => {
    try {
      const url = `http://localhost:5001/cliente/${idCliente}`;
      const resp = await axios.get(url);

      const cliente = resp.data[0];
      setDadosCliente({ ...cliente, nome: cliente.primeiro_nome });
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao buscar o cliente");
    }
  }, [idCliente]);

  useEffect(() => {
    if (idCliente) {
      buscarCliente();
    }
  }, [idCliente, buscarCliente]);

  const chamarModal = () => {
    setAbrirModal(true);
    document.body.classList.add("tela-alterar-senha-cliente-modal");
  };

  const fecharModal = () => {
    setAbrirModal(false);
    document.body.classList.remove("tela-alterar-senha-cliente-modal");
  };

  return (
    <div className="pagina-perfil-cliente pagina">
      {abrirModal && <div className="bloqueio-tela-perfil-cliente"></div>}
      {abrirModal && (
        <ModalAlterarSenhaCliente
          cliente={cliente.id_cliente}
          fecharModal={fecharModal}
        />
      )}
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <section className="banner-perfil">
          <div className="titulo-banner">
            <h1>Meu Perfil</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao
              nome="Perfil"
              abaAtual={true}
              navegacao="/perfil"
              cliente={cliente}
            />
            <AbaNavegacao
              nome="Endereço (s) Cadastrado (s)"
              navegacao="/enderecocliente"
              cliente={cliente}
            />
            <AbaNavegacao
              nome="Meus Pedidos"
              navegacao="/meuspedidos"
              cliente={cliente}
            />
            <AbaNavegacao
              nome="Meu Carrinho"
              navegacao="/meucarrinho"
              cliente={cliente}
            />
          </div>
        </section>

        <section className="dados-cliente">
          <div className="entrada-dados">
            <div className="entrada">
              <InputPadrao
                labelCampo="Nome:"
                placeholder="Seu nome"
                valor={dadosCliente.nome}
                setValor={(novoNome) =>
                  setDadosCliente((prev) => ({
                    ...prev,
                    nome: novoNome,
                  }))
                }
                tamanhoMaximo={300}
                requerido={true}
              />
            </div>

            <div className="entrada">
              <InputPadrao
                labelCampo="Sobrenome:"
                placeholder="Seu sobrenome"
                valor={dadosCliente.sobrenome}
                setValor={(novoSobrenome) =>
                  setDadosCliente((prev) => ({
                    ...prev,
                    sobrenome: novoSobrenome,
                  }))
                }
                tamanhoMaximo={30}
                requerido={true}
              />
            </div>

            <div className="entrada">
              <InputPadrao
                tipoCampo="email"
                labelCampo="E-mail:"
                placeholder="Seu e-mail"
                valor={dadosCliente.email}
                tamanhoMaximo={100}
                apenasLeitura={true}
              />
            </div>

            <div className="entrada">
              <InputPadrao
                labelCampo="Celular:"
                placeholder="Seu celular. Exemplo: (11) 91111-1111"
                valor={dadosCliente.celular}
                setValor={(novoCelular) =>
                  setDadosCliente((prev) => ({
                    ...prev,
                    celular: novoCelular,
                  }))
                }
                tamanhoMaximo={15}
                requerido={true}
              />
            </div>

            <div className="entrada">
              <InputPadrao
                labelCampo="CPF:"
                placeholder="Seu CPF"
                valor={dadosCliente.cpf}
                tamanhoMaximo={11}
                apenasLeitura={true}
              />
            </div>

            <div className="entrada">
              <InputPadrao
                tipoCampo="date"
                labelCampo="Data de Nascimento:"
                placeholder="Sua Data de Nascimento"
                valor={dadosCliente.data_nascimento}
                setValor={(novaDataNascimento) =>
                  setDadosCliente((prev) => ({
                    ...prev,
                    data_nascimento: novaDataNascimento,
                  }))
                }
              />
            </div>
            <div className="entrada alteracao-senha">
              <i class="fa-solid fa-unlock-keyhole"></i>
              <span onClick={chamarModal}>Alterar Senha</span>
            </div>
          </div>
          <div className="botoes-dados-usuario">
            <button onClick={alterarDados}>Salvar</button>
            <button onClick={() => confimarSaidaSite()}>Sair da Conta</button>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
