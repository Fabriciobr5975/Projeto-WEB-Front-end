import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function PerfilCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [idCliente] = useState(cliente.id_cliente);
  const [bloqueioSenha, setBloqueioSenha] = useState(true);

  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    senha: "",
    data_nascimento: "",
    celular: "",
  });

  const habilitarCampoSenha = () => {
    setBloqueioSenha((senha) => !senha);
    alert(`${bloqueioSenha ? "O campo da senha foi habilitado!" : "O campo da senha foi desabilitado!" }`);
  };

  const alterarDados = async () => {
    try {
      const url = `http://localhost:5001/cliente/${idCliente}`;
      const resp = await axios.put(url, dadosCliente);

      const resposta = resp.data.resposta;

      if (resposta >= 1) {
        alert("Os seus dados foram alterados com sucesso!");
      }

      setBloqueioSenha(true);
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar o cliente");
    }
  };

  const confimarSaidaSite = () => {
    if (window.confirm("Você está saindo da sua conta, clique em OK para continuar e realizar o logout")) {
      sessionStorage.removeItem("cliente");
      navigate("/homepage");
    }
  };

  const buscarCliente = useCallback(async () => {
    try {
      const url = `http://localhost:5001/cliente/${idCliente}`;
      const resp = await axios.get(url);

      const cliente = resp.data[0];
      setDadosCliente({
        nome: cliente.primeiro_nome,
        sobrenome: cliente.sobrenome,
        cpf: cliente.cpf,
        data_nascimento: cliente.data_nascimento,
        email: cliente.email,
        senha: cliente.senha,
        celular: cliente.celular,
      });
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao buscar o cliente");
    }
  }, [idCliente]);

  useEffect(() => {
    if (idCliente) {
      buscarCliente();
    }
  }, [idCliente, buscarCliente]);

  return (
    <div className="pagina-perfil-cliente pagina">
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
              <label>Nome:</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={dadosCliente.nome}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    nome: e.target.value,
                  })
                }
              />
            </div>

            <div className="entrada">
              <label>Sobrenome:</label>
              <input
                type="text"
                placeholder="Seu sobrenome"
                value={dadosCliente.sobrenome}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    sobrenome: e.target.value,
                  })
                }
              />
            </div>

            <div className="entrada">
              <label>E-mail:</label>
              <input
                type="email"
                style={{ background: "#d0d0d0" }}
                placeholder="Seu e-mail"
                value={dadosCliente.email}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    email: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            <div className="entrada">
              <label>Celular:</label>
              <input
                type="text"
                placeholder="Seu celular"
                value={dadosCliente.celular}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    celular: e.target.value,
                  })
                }
              />
            </div>

            <div className="entrada">
              <label>Senha:</label>
              <input
                type={bloqueioSenha ? "password" : "text"}
                style={{ background: bloqueioSenha ? "#d0d0d0" : "inherit" }}
                placeholder="Sua Senha Cadastrada"
                value={dadosCliente.senha}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    senha: e.target.value,
                  })
                }
                readOnly={bloqueioSenha}
              />
              <span onClick={() => habilitarCampoSenha()}>Alterar Senha</span>
            </div>

            <div className="entrada">
              <label>CPF:</label>
              <input
                type="text"
                placeholder="Seu CPF"
                style={{ background: "#d0d0d0" }}
                readOnly
                value={dadosCliente.cpf}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    cpf: e.target.value,
                  })
                }
              />
            </div>

            <div className="entrada">
              <label>Data de Nascimento</label>
              <input
                type="date"
                value={dadosCliente.data_nascimento}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    data_nascimento: e.target.value,
                  })
                }
              />
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
