import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function PerfilCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  const navigate = useNavigate();

  const [idCliente] = useState(cliente.id_cliente);

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    senha: "",
    data_nascimento: "",
    celular: "",
  });

  const alterarDados = async () => {
    try {
      const url = `http://localhost:5001/cliente/${idCliente}`;
      const resp = await axios.put(url, dadosCliente);

      const resposta = resp.data.resposta;

      if (resposta >= 1) {
        alert("Os seus dados foram alterados com sucesso!");
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar o cliente");
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
                placeholder="Seu e-mail"
                value={dadosCliente.email}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    email: e.target.value,
                  })
                }
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
                type="password"
                placeholder="Sua Senha Cadastrada"
                value={dadosCliente.senha}
                onChange={(e) =>
                  setDadosCliente({
                    ...dadosCliente,
                    senha: e.target.value,
                  })
                }
              />
              <Link to="/recuperacaosenha">Alterar Senha</Link>
            </div>

            <div className="entrada">
              <label>CPF:</label>
              <input
                type="text"
                placeholder="Seu CPF"
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
          <div className="botao">
            <button onClick={alterarDados}>Salvar</button>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
