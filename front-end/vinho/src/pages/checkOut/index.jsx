import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TelaCarregamento from "../../components/telaCarregamento";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { calcularValorTotalCarrinho } from "../../service/calculosCarrinho/calculosCarrinhoCliente";
import { imprimirNumeroComVirgula } from "../../utils/conversaoUtil";

export default function CheckOut() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState({});

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

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

  const [cpfCliente] = useState(cliente.cpf);
  const [listaItensCarrinho, setListaItensCarrinho] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);

  /* Listar todos os itens do carrinho */
  const listarItensCarrinho = useCallback(async () => {
    try {
      const url = `http://localhost:5001/itenscarrinho/busca/cliente?cliente=${cpfCliente}`;

      const resp = await axios.get(url);
      const carrinho = resp.data;

      setListaItensCarrinho(carrinho);
    } catch (error) {
      alert(
        error.response?.data?.erro ??
          "Erro ao buscar as informações dos seus pedidos"
      );
    }
  }, [cpfCliente]);

  useEffect(() => {
    setPrecoTotal(calcularValorTotalCarrinho(listaItensCarrinho));
  }, [listaItensCarrinho]);

  useEffect(() => {
    if (cpfCliente) {
      listarItensCarrinho();
    }
  }, [cpfCliente, listarItensCarrinho]);

  /* Alterar um item do carrinho */
  const alterarItemCarrinho = useCallback(
    async (idItemCarrinho) => {
      try {
        if (sessionStorage.getItem("cliente")) {
          const itemCarrinho = {
            carrinho: cliente.id_cliente,
            vinho: listaItensCarrinho[idItemCarrinho].id_vinho,
            quantidade: listaItensCarrinho[idItemCarrinho].quantidade,
          };

          const url = `http://localhost:5001/itenscarrinho/${listaItensCarrinho[idItemCarrinho].id_itens_carrinho}`;
          await axios.put(url, itemCarrinho);

          alert("A quantidade foi alterada com sucesso!");
        }
      } catch (error) {
        alert(
          error.response?.data?.erro ??
            "Erro ao alterar a quantidade de vinhos no carrinho"
        );
      }
    },
    [listaItensCarrinho, cliente]
  );

  /* Aumentar a quantidade do vinho */
  const aumentarQuantidade = useCallback(
    (idItemCarrinho) => {
      if (listaItensCarrinho[idItemCarrinho].quantidade < 100) {
        listaItensCarrinho[idItemCarrinho].quantidade += 1;
        setListaItensCarrinho((prev) => [...prev]);

        alterarItemCarrinho(idItemCarrinho);
      }
    },
    [listaItensCarrinho, alterarItemCarrinho]
  );

  /* diminuir a quantidade do vinho */
  const diminuirQuantidade = useCallback(
    (idItemCarrinho) => {
      if (listaItensCarrinho[idItemCarrinho].quantidade > 1) {
        listaItensCarrinho[idItemCarrinho].quantidade -= 1;
        setListaItensCarrinho((prev) => [...prev]);

        alterarItemCarrinho(idItemCarrinho);
      }
    },
    [listaItensCarrinho, alterarItemCarrinho]
  );

  return (
    <main className="pagina-check-out pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <section className="banner-abas">
          <div className="titulo-banner">
            <h1>Check - Out</h1>
          </div>
        </section>
        <section className="conteudo">
          <div className="container">
            <div className="titulo">
              <h1>
                <strong>1. REVISÃO DOS ITENS</strong>
              </h1>
            </div>
            <div className="container-conteudo">
              <div className="itens-revisao">
                {listaItensCarrinho.map((item, index) => (
                  <div className="item-revisao" key={index}>
                    <img src={item.imagem_vinho} alt="Imagem Vinho" />
                    <div className="info">
                      <strong>Nome: {item.vinho}</strong>
                      <span>Vinícola: {item.vinicola_vinho}</span>
                      <div className="quantidade-preco">
                        <div className="manipulacao-quantidade">
                          <span onClick={() => diminuirQuantidade(index)}>
                            -
                          </span>
                          {item.quantidade}
                          <span onClick={() => aumentarQuantidade(index)}>
                            +
                          </span>
                        </div>
                        <span className="preco">
                          {" "}
                          <span className="cifrao">R$</span>
                          {imprimirNumeroComVirgula(
                            Number(item.preco_vinho) * item.quantidade
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="total">
                <span>
                  <h3>Total:</h3>
                </span>
                <span>
                  <h3>
                    <strong>
                      R$ {imprimirNumeroComVirgula(precoTotal.toFixed(2))}
                    </strong>
                  </h3>
                </span>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="titulo">
              <h1>
                <strong>2. ENDEREÇO DE ENTREGA</strong>
              </h1>
            </div>
            <div className="container-conteudo">
              <div className="busca">
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
                <input type="button" value="Adicionar Novo" />
              </div>
              <div className="container-conteudo-endereco">
                <div className="campo">
                  <span> Apelido do Endereço: </span>
                  <input
                    type="text"
                    placeholder="Digite o apelido do endereço"
                  />
                </div>
                <div className="campo-duplo1">
                  <div className="campo">
                    <span> Primeiro Nome: </span>
                    <input
                      type="text"
                      placeholder="Primeiro nome"
                      value={cliente.primeiro_nome}
                      readOnly
                    />
                  </div>
                  <div className="campo">
                    <span> Último Nome: </span>
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      value={cliente.sobrenome}
                      readOnly
                    />
                  </div>
                </div>
                <div className="campo-duplo2">
                  <div className="campo">
                    <span> Estado: </span>
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
                  <div className="campo">
                    <span> Cidade: </span>
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
                </div>
                <div className="campo">
                  <span> Bairro: </span>
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
                <div className="campo">
                  <span> Logradouro: </span>
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
                <div className="campo-duplo2">
                  <div className="campo">
                    <span> Número: </span>
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
                      readOnly
                    />
                  </div>
                  <div className="campo">
                    <span> CEP: </span>
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
                      readOnly
                    />
                  </div>
                </div>
                <div className="campo">
                  <span> E-mail: </span>
                  <input
                    type="text"
                    placeholder="E-mail"
                    value={cliente.email}
                    readOnly
                  />
                </div>
                <div className="campo">
                  <span> Número para Contato: </span>
                  <input
                    type="text"
                    placeholder="Celular"
                    value={cliente.celular}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container2">
            <div className="container">
              <div className="titulo">
                <h1>
                  <strong>3. SELECIONE MÉTODOS DE PAGAMENTO</strong>
                </h1>
              </div>
              <div className="container-conteudo">
                <div className="opcoes">
                  <div className="opcao">
                    <input type="checkbox" /> <span>Cartão Débito</span>
                  </div>
                  <div className="opcao">
                    <input type="checkbox" /> <span>Cartão Crédito</span>
                  </div>
                  <div className="opcao">
                    <input type="checkbox" /> <span>Pix</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="titulo">
                <h1>
                  <strong>4. SUMÁRIO DO PEDIDO</strong>
                </h1>
              </div>
              {listaItensCarrinho.map((item, index) => (
                <div className="container-conteudo" key={index}>
                  <div className="opcoes">
                    <div className="opcao">
                      <input type="checkbox" /> <span>Cartão Crédito</span>
                    </div>
                    <div className="opcao">
                      <input type="checkbox" /> <span>Pix</span>
                    </div>
                  </div>
                  <div className="resumo-item">
                    <div className="info-vinho">
                      <span className="quantidade">{item.quantidade}</span>
                      <span className="nome">Nome: {item.vinho}</span>
                    </div>
                    <span className="preco">
                      R$
                      {imprimirNumeroComVirgula(
                        Number(item.preco_vinho) * item.quantidade
                      )}
                    </span>
                  </div>
                </div>
              ))}
              <div className="preco-total-pedido">
                <span>
                  <h3>Total:</h3>
                </span>
                <span>
                  <h3>
                    <strong>
                      R$ {imprimirNumeroComVirgula(precoTotal.toFixed(2))}
                    </strong>
                  </h3>
                </span>
              </div>
              <div className="container-conteudo">
                <div className="button">
                  <input
                    type="button"
                    value="Confirmar Pedido"
                    onClick={() => navigate("/confirmacaopedido")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer cliente={cliente} />
      </TelaCarregamento>
    </main>
  );
}
