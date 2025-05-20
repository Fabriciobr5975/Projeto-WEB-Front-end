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
  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [indexLista, setIndexLista] = useState(-1);

  const [enderecoSelecionado, setEnderecoSelecionado] = useState({
    id_cliente: 0,
    nome_completo_cliente: "",
    cpf: "",
    email: "",
    id_endereco: 0,
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    apelido_endereco: "",
    numero: "",
    complemento: "",
  });

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const pegarEnderecoViaCep = useCallback(async () => {
    try {
      const resp = await axios.get(
        `https://viacep.com.br/ws/${enderecoSelecionado.cep}/json/`
      );
      const enderecoBusca = resp.data;

      if (enderecoBusca?.erro) {
        alert("CEP inválido! Tente novamente.");
        return;
      }

      setEnderecoSelecionado((novoEndereco) => ({
        ...novoEndereco,
        uf: enderecoBusca.uf,
        cidade: enderecoBusca.localidade,
        bairro: enderecoBusca.bairro,
        logradouro: enderecoBusca.logradouro,
      }));
    } catch (err) {
      console.error("Erro ao buscar endereço");
    }
  }, [enderecoSelecionado.cep]);

  useEffect(() => {
    if (
      enderecoSelecionado.cep.length === 8 ||
      enderecoSelecionado.cep.length === 9
    ) {
      pegarEnderecoViaCep();
    }
  }, [enderecoSelecionado.cep, pegarEnderecoViaCep]);

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

  const colocarApelidoEnderecoPadrao = (endereco) => {
    if (!endereco.apelido_endereco) {
      endereco.apelido_endereco =
        `${enderecoSelecionado.logradouro} ${enderecoSelecionado.numero} - ${enderecoSelecionado.cep}, ${enderecoSelecionado.numero} ${enderecoSelecionado.cidade}`.replace(
          /\n/g,
          " "
        );
    }
  };

  const inserirNovoEndereco = async () => {
    try {
      const enderecoInsercao = {
        logradouro: enderecoSelecionado.logradouro,
        bairro: enderecoSelecionado.bairro,
        localidade: enderecoSelecionado.cidade,
        uf: enderecoSelecionado.uf,
        cep: enderecoSelecionado.cep,
        numero: enderecoSelecionado.numero,
        complemento: enderecoSelecionado.complemento,
        apelido_endereco: enderecoSelecionado.apelido_endereco,
        endereco: enderecoSelecionado.cep,
        cliente: cliente.cpf,
      };

      colocarApelidoEnderecoPadrao(enderecoInsercao);

      const url = `http://localhost:5001/enderecocliente`;
      const resp = await axios.post(url, enderecoInsercao);

      const resposta = resp.data;

      alert(resposta.resposta);
      listarEnderecosCliente();
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao inserir esse endereço");
    }
  };

  const alterarEndereco = async () => {
    try {
      const dadosAlteracaoEndereco = {
        endereco: enderecoSelecionado.cep,
        cliente: cliente.cpf,
        numero: enderecoSelecionado.numero,
        complemento: enderecoSelecionado.complemento,
        apelido_endereco: enderecoSelecionado.apelido_endereco,
      };

      colocarApelidoEnderecoPadrao(dadosAlteracaoEndereco);

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
      await axios.delete(url);

      alert("Endereço removido com sucesso!");
      listarEnderecosCliente();
      limparEnderecoSelecionado();
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar os seus endereços salvos"
      );
    }
  };

  const limparEnderecoSelecionado = () => {
    setEnderecoSelecionado({
      id_cliente: 0,
      nome_completo_cliente: "",
      cpf: "",
      email: "",
      id_endereco: 0,
      logradouro: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      apelido_endereco: "",
      numero: "",
      complemento: "",
    });

    setIndexLista(-1);
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
            <select
              name="lista-enderecos"
              value={indexLista}
              onChange={(e) => {
                const novoIndex = e.target.value;
                setIndexLista(novoIndex);
                setEnderecoSelecionado(listaEnderecos[novoIndex]);
              }}
            >
              <option value={-1} disabled selected>
                Lista de Endereços
              </option>

              {listaEnderecos.map((endereco, index) => (
                <option key={endereco.id_cliente} value={index}>
                  {endereco.apelido_endereco}
                </option>
              ))}
            </select>

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
                value={enderecoSelecionado.apelido_endereco}
                onChange={(e) =>
                  setEnderecoSelecionado({
                    ...enderecoSelecionado,
                    apelido_endereco: e.target.value,
                  })
                }
              />
            </div>

            <div className="entrada">
              <label>Estado:</label>
              <input
                type="text"
                style={{ background: "#d0d0d0" }}
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
                style={{ background: "#d0d0d0" }}
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
                style={{ background: "#d0d0d0" }}
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
                style={{ background: "#d0d0d0" }}
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
                />
              </div>
            </div>
          </div>
          <div className="botoes-endereco">
            <button
              className="botao-salvar"
              onClick={() => inserirNovoEndereco()}
            >
              Salvar
            </button>

            <button className="botao-alterar" onClick={() => alterarEndereco()}>
              Alterar
            </button>

            <button className="botao-excluir" onClick={() => removerEndereco()}>
              Excluir
            </button>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
