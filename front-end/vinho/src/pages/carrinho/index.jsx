import "./index.scss";

import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CarrinhoCliente() {
  const [listaItensCarrinho, setListaItensCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    listarPedidos();
  }, []);

  const listarPedidos = async () => {
    try {
      const url = `http://localhost:5001/itenscarrinho/busca/cliente?cliente=60741430053`;

      const resp = await axios.get(url);
      const carrinho = resp.data;

      setListaItensCarrinho(carrinho);
    } catch (error) {
      alert(
        error.response?.data?.erro ??
          "Erro ao buscar as informações dos seus pedidos"
      );
    }
  };

  return (
    <div className="pagina-carrinho-cliente pagina">
      <Header />

      <section className="banner-perfil">
        <div className="titulo-banner">
          <h1>Meu Perfil</h1>
        </div>
        <div className="abas-navegacao">
          <AbaNavegacao nome="Perfil" />
          <AbaNavegacao nome="Endereço (s) Cadastrado (s)" />
          <AbaNavegacao nome="Meus Pedidos" />
          <AbaNavegacao nome="Meu Carrinho" abaAtual={true} />
        </div>
      </section>

      <section className="carrinho-cliente">
        <table>
          <colgroup>
            <col className="item-carrinho" />
            <col className="quantidade-carrinho" />
            <col className="descricao-carrinho" />
            <col className="valor-unitario-carrinho" />
            <col className="total-carrinho" />
            <col className="remover-item-carrinho" />
          </colgroup>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd.</th>
              <th>Descrição</th>
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
                  <img src="/assets/images/vinho-exemplo.svg" />
                </td>
                <td>
                  <div className="manipulacao-quantidade">
                    <span>-</span>
                    {carrinho.quantidade}
                    <span>+</span>
                  </div>
                </td>
                <td>{carrinho.descricao}</td>
                <td><div className="preco"><span>R$</span>{carrinho.preco_vinho}</div></td>
                <td><div className="preco"><span>R$</span>{valorTotal}</div></td>
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

      <Footer />
    </div>
  );
}
