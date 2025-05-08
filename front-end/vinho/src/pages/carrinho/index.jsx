import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CarrinhoCliente() {
  const location = useLocation();
  const { cliente } = location.state || {};
  const [cpfCliente] = useState(cliente.cpf);

  const [listaItensCarrinho, setListaItensCarrinho] = useState([]);
  // const [valorTotal, setValorTotal] = useState(0);

  const listarPedidos = useCallback(async () => {
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
    if (cpfCliente) {
      listarPedidos();
    }
  }, [cpfCliente, listarPedidos]);

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
              {listaItensCarrinho.map((carrinho) => (
                <tr key={carrinho.id_itens_carrinho}>
                  <td className="primeira-coluna">
                    {carrinho.vinho}
                    <img
                      src="/assets/images/vinho-exemplo.svg"
                      alt="imagem vinho"
                    />
                  </td>
                  <td>
                    <div className="manipulacao-quantidade">
                      <span>-</span>
                      {carrinho.quantidade}
                      <span>+</span>
                    </div>
                  </td>
                  <td>{carrinho.vinho}</td>
                  <td>
                    <div className="preco">
                      <span>R$</span>
                      {carrinho.preco_vinho}
                    </div>
                  </td>
                  <td>
                    <div className="preco">
                      <span>R$</span>
                      {0}
                    </div>
                  </td>
                  <td>
                    <div className="icone-excluir">
                      <i class="fa-solid fa-trash-can"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
