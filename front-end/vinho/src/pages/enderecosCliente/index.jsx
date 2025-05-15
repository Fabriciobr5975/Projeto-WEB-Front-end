import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function EnderecosCliente() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState({});

  const listarEnderecosCliente = useCallback(async () => {
    try {
      const url = `http://localhost:5001/enderecocliente/busca/cliente?cliente=${cliente.cpf}`;
      const resp = await axios.get(url);

      const resposta = resp.data;

      setListaEnderecos([...resposta]);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar os seus endereços salvos"
      );
    }
  }, [cliente]);

  useEffect(() => {
    listarEnderecosCliente();
  }, [listarEnderecosCliente]);

  const manipularEndereco = () => {
    if(enderecoSelecionado.id_cliente <= 0 || !enderecoSelecionado.id_cliente) {
      inserirNovoEndereco();
    
    } else {
      alterarEndereco();
    }
  }

  /**
   * TODO: Precisa de ajustes
   */
  const inserirNovoEndereco = async () => {
    try {
      const url = `http://localhost:5001/enderecocliente/id?/cliente?cliente=${cliente.cpf}`;
      const resp = await axios.get(url);

      const resposta = resp.data;

      setListaEnderecos([...resposta]);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar os seus endereços salvos"
      );
    }
  };

  const alterarEndereco = async () => {
    try {
      const dadosAlteracaoEndereco = {
        endereco: enderecoSelecionado.cep,
        cliente: cliente.cpf,
        numero: enderecoSelecionado.numero,
        complemento: enderecoSelecionado.complemento,
      };
      
      const url = `http://localhost:5001/enderecocliente/id?endereco=${enderecoSelecionado.cep}&cliente=${cliente.cpf}`;
      await axios.put(url, dadosAlteracaoEndereco);

      alert("Alteração realizada com sucesso");
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar os seus endereços salvos"
      );
    }
  };

  const removerEndereco = async () => {
    try {
      const url = `http://localhost:5001/enderecocliente/id?endereco=${enderecoSelecionado.cep}&cliente=${cliente.cpf}`;
      const resp = await axios.delete(url);

      const resposta = resp.data;

      setListaEnderecos([...resposta]);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar os seus endereços salvos"
      );
    }
  };

  const limparEnderecoSelecionado = () => {
    if (enderecoSelecionado && enderecoSelecionado.id_cliente > 0) {
      setEnderecoSelecionado({
        id_cliente: -1,
        nome_completo_cliente: "",
        cpf: "",
        email: "",
        id_endereco: 0,
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        numero: "",
        complemento: "",
      });
    }
  };

  return (
    <div className="pagina-enderecos-cliente pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <section className="banner-perfil">
          <div className="titulo-banner">
            <h1>Meu Perfil</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao nome="Perfil" navegacao="/perfil" cliente={cliente} />
            <AbaNavegacao
              nome="Endereço (s) Cadastrado (s)"
              abaAtual={true}
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

        <section className="enderecos-cliente">
          <div className="listagem-enderecos-salvos">
            {listaEnderecos.map((endereco, index) => (
              <select
                key={index}
                name="lista-enderecos"
                value={enderecoSelecionado?.id_cliente ?? -1}
                onChange={(e) =>
                  setEnderecoSelecionado(listaEnderecos[e.target.value])
                }
              >
                <option value={-1} disabled selected>
                  Lista de Endereços
                </option>
                <option value={index}>
                  {endereco.logradouro} {endereco.numero} - {endereco.cep},{" "}
                  {endereco.numero}, {endereco.cidade}
                </option>
              </select>
            ))}
            <button
              className="botao-limpar-endereco"
              onClick={limparEnderecoSelecionado}
            >
              Limpar Endereço
            </button>
          </div>

          <div className="entrada-dados">
            <div className="entrada">
              <label>Apelido do Endereço:</label>
              <input
                type="text"
                placeholder="Digite o apelido que você dar ao endereço"
              />
            </div>

            <div className="entrada">
              <label>Estado:</label>
              <input
                type="text"
                placeholder="Estado"
                value={enderecoSelecionado.uf}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    uf: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            <div className="entrada">
              <label>Logradouro:</label>
              <input
                type="text"
                placeholder="Logradouro"
                value={enderecoSelecionado.logradouro}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    logradouro: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            <div className="entrada">
              <label>Cidade:</label>
              <input
                type="text"
                placeholder="Cidade"
                value={enderecoSelecionado.cidade}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    cidade: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            <div className="entrada">
              <label>Bairro:</label>
              <input
                type="text"
                placeholder="Bairro"
                value={enderecoSelecionado.bairro}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    bairro: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            <div className="entrada">
              <label>Complemento:</label>
              <input
                type="text"
                placeholder="Complemento"
                value={enderecoSelecionado.complemento}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    complemento: e.target.value,
                  })
                }
              />
            </div>

            <div className="ultima-linha">
              <div className="entrada">
                <label>Número:</label>
                <input
                  type="text"
                  placeholder="Número"
                  value={enderecoSelecionado.numero}
                  onChange={(e) =>
                    setEnderecoSelecionado({
                      ...enderecoSelecionado,
                      numero: e.target.value,
                    })
                  }
                />
              </div>

              <div className="entrada">
                <label>CEP:</label>
                <input
                  type="text"
                  placeholder="CEP"
                  value={enderecoSelecionado.cep}
                  onChange={(e) =>
                    setEnderecoSelecionado({
                      ...enderecoSelecionado,
                      cep: e.target.value,
                    })
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="botoes-endereco">
            <button className="botao-salvar" onClick={() => manipularEndereco()}>
              Salvar
            </button>
            <button className="botao-excluir" onClick={removerEndereco}>Excluir</button>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
