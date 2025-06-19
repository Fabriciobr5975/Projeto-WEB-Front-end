import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { calcularValorTotalCarrinho } from "../../service/calculosCarrinho/calculosCarrinhoCliente";
import { imprimirNumeroComVirgula } from "../../utils/conversaoUtil";

export default function CarrinhoCliente() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

  const [cpfCliente] = useState(cliente.cpf);
  const [listaItensCarrinho, setListaItensCarrinho] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect(() => {
    setPrecoTotal(calcularValorTotalCarrinho(listaItensCarrinho));
  }, [listaItensCarrinho]);

  /* Listar todos os itens do carrinho */
  const listarItensCarrinho = useCallback(async () => {
    try {
      const url = `http://localhost:5001/itenscarrinho/busca/cliente?cliente=${cpfCliente}`;

      const resp = await axios.get(url);
      const carrinho = resp.data;

      setListaItensCarrinho(carrinho);
    } catch (error) {
      if (
        error.response?.data?.erro ===
        "Não foram encontrado registros para o itens do carrinho"
      ) {
        return;
      }

      alert(error.response?.data?.erro);
    }
  }, [cpfCliente]);

  /* Remover um item do carrinho */
  const removerItemCarrinho = async (idItemCarrinho) => {
    try {
      const url = `http://localhost:5001/itenscarrinho/${idItemCarrinho}`;
      await axios.delete(url);

      alert("O item foi removido com sucesso do carrinho!");

      listarItensCarrinho();

      if (listaItensCarrinho.length === 1) {
        navigate(0);
      } 
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao remover o item do carrinho!"
      );
    }
  };

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
        }
      } catch (error) {
        alert(
          error.response?.data?.erro ??
            "Erro ao alterar a quantidade de vinhos no carrinho"
        );
        listaItensCarrinho[idItemCarrinho].quantidade -= 1;
        setListaItensCarrinho((prev) => [...prev]);

        alterarItemCarrinho(idItemCarrinho);
      }
    },
    [listaItensCarrinho, cliente]
  );

  /* Aumentar a quantidade do vinho */
  const aumentarQuantidade = useCallback(
    (idItemCarrinho) => {
      listaItensCarrinho[idItemCarrinho].quantidade += 1;
      setListaItensCarrinho((prev) => [...prev]);

      alterarItemCarrinho(idItemCarrinho);
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
    <div className="pagina-carrinho-cliente pagina">
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
              abaAtual={true}
              navegacao="/meucarrinho"
              cliente={cliente}
            />
          </div>
        </section>

        {listaItensCarrinho.length === 0 ? (
          <div className="carrinho-vazio">
            <div className="conteudo-carrinho-vazio">
              <img
                src="/assets/images/cart-shopping-solid.svg"
                alt="carrinho vazio"
              />

              <div className="mensagem-carrinho-vazio">
                <span>
                  Seu carrinho está vazio. Nosso catálogo de vinhos te aguarda
                  para novas experiências!
                </span>

                <Link to="/produtos">Continuar comprando</Link>
              </div>
            </div>
          </div>
        ) : (
          <section className="carrinho-cliente">
            <table>
              <colgroup>
                <col className="item-carrinho" />
                <col className="quantidade-carrinho" />
                <col className="nome-vinho-carrinho" />
                <col className="valor-unitario-carrinho" />
                <col className="total-carrinho" />
                <col className="remover-item-carrinho" />
              </colgroup>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantidade</th>
                  <th>Nome do Vinho</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                  <th>Remover Item</th>
                </tr>
              </thead>
              <tbody>
                {listaItensCarrinho.map((carrinho, index) => (
                  <tr key={carrinho.id_itens_carrinho}>
                    <td className="primeira-coluna">
                      <img src={carrinho.imagem_vinho} alt="imagem vinho" />
                    </td>
                    <td>
                      <div className="manipulacao-quantidade">
                        <span onClick={() => diminuirQuantidade(index)}>-</span>
                        {carrinho.quantidade}
                        <span onClick={() => aumentarQuantidade(index)}>+</span>
                      </div>
                    </td>
                    <td>{carrinho.vinho}</td>
                    <td>
                      <div className="preco">
                        <span>R$</span>
                        {imprimirNumeroComVirgula(carrinho.preco_vinho)}
                      </div>
                    </td>
                    <td>
                      <div className="preco">
                        <span>R$</span>
                        {imprimirNumeroComVirgula(
                          Number(
                            carrinho.preco_vinho * carrinho.quantidade
                          ).toFixed(2)
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="icone-excluir">
                        <i
                          class="fa-solid fa-trash-can"
                          onClick={() =>
                            removerItemCarrinho(carrinho.id_itens_carrinho)
                          }
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <span className="valor-total-carrinho">
              Valor Total:{" "}
              <strong>
                R$ {imprimirNumeroComVirgula(precoTotal.toFixed(2))}
              </strong>
            </span>

            <button
              className="botao-finalizar-compra"
              onClick={() =>
                listaItensCarrinho.length > 0
                  ? navigate("/checkout")
                  : alert(
                      "Para finalizar o pedido é necessário adicionar itens ao carrinho!"
                    )
              }
            >
              Finalizar Compra
            </button>
          </section>
        )}

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
