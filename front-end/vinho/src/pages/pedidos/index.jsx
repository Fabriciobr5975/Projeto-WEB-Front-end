import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PedidosCliente() {
  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    listarPedidos();
  }, []);

  const listarPedidos = async () => {
    try {
      const url = `http://localhost:5001/pedido/busca/cliente?cliente=60741430053`;

      const resp = await axios.get(url);
      const pedidos = resp.data;

      setListaPedidos(Object.values(pedidos));
    } catch (error) {
      alert(
        error.response?.data?.erro ??
          "Erro ao buscar as informações dos seus pedidos"
      );
    }
  };

  return (
    <div className="pagina-pedidos-cliente pagina">
      <Header />

      <section className="banner-perfil">
        <div className="titulo-banner">
          <h1>Meu Perfil</h1>
        </div>
        <div className="abas-navegacao">
          <AbaNavegacao nome="Perfil" />
          <AbaNavegacao nome="Endereço (s) Cadastrado (s)" />
          <AbaNavegacao nome="Meus Pedidos" abaAtual={true} />
          <AbaNavegacao nome="Meu Carrinho" />
        </div>
      </section>

      <section className="pedidos-cliente">
        <div className="filtragem-pedidos">
          <span>Período:</span>
          <select name="filtragem">
            <option value="todos">Mostrar todos os pedidos</option>
            <option>Últimos 12 meses</option>
            <option>Último mês</option>
            <option>última Compra</option>
          </select>
        </div>

        <div className="listagem-pedidos">
          <table>
            <colgroup>
              <col className="numero-pedido" />
              <col className="quantidade-pedido" />
              <col className="descricao-pedido" />
              <col className="status-pedido" />
              <col className="data-pedido" />
            </colgroup>
            <thead>
              <tr>
                <th>Nº do Pedido</th>
                <th>Qtd.</th>
                <th>Descrição</th>
                <th>Status do Pedido</th>
                <th>Data/Mês/Ano</th>
              </tr>
            </thead>
            <tbody>
              {listaPedidos.map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td className="primeira-coluna">
                    <div className="conteudo-lista">{pedido.id_pedido}</div>
                    <button>Ver Pedido Completo</button>
                  </td>
                  <td>
                    {pedido.itens.map((item) => (
                      <div className="conteudo-lista">
                        <div key={item.id_vinho}>{item.quantidade}</div>
                      </div>
                    ))}
                  </td>
                  <td>
                    {pedido.itens.map((item) => (
                      <div className="conteudo-lista">
                        <div key={item.id_vinho}>{item.descricao}</div>
                      </div>
                    ))}
                  </td>
                  <td>{pedido.status_pedido}</td>
                  <td>{pedido.data_pedido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}
