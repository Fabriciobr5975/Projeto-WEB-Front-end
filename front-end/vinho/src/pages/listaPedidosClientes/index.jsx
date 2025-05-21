import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

export default function ListaPedidosClientes() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    impedirAcessoTelaAdministrador(cliente, navigate);
  }, [cliente, navigate]);

  const [listaPedidos, setListaPedidos] = useState([]);
  const [atualizarLista, setAtualizarLista] = useState(false);

  useEffect(() => {
    listarPedidosClientes();
  }, [atualizarLista]);

  const listarPedidosClientes = async () => {
    try {
      const url = `http://localhost:5001/pedido`;

      const resp = await axios.get(url);
      const pedidos = resp.data;

      setListaPedidos(Object.values(pedidos));
    } catch (error) {
      alert(
        error.response?.data?.erro ??
        "Erro ao buscar as informações dos pedidos"
      );
    }
  };

  const atualizarTabela = () => {
    setAtualizarLista((atualizar) => !atualizar);
  };

  const alterarPedidoCliente = async (index) => {
    try {
      const pedidoCliente = {
        status_pedido: listaPedidos[index].status_pedido,
        data_pedido: listaPedidos[index].data_pedido,
      };

      if (sessionStorage.getItem("cliente")) {
        const url = `http://localhost:5001/pedido/${listaPedidos[index].id_pedido}`;
        await axios.put(url, pedidoCliente);

        alert(
          `O pedido de número ${listaPedidos[index].id_pedido} foi alterado com sucesso com sucesso!`
        );
        listarPedidosClientes();
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao alterar o pedido!");
    }
  };

  const removerPedidoCliente = async (idPedido) => {
    try {
      if (sessionStorage.getItem("cliente")) {
        const url = `http://localhost:5001/pedido/${idPedido}`;
        await axios.delete(url);

        alert(`O pedido de número ${idPedido} foi removido com sucesso!`);
        listarPedidosClientes();
      }
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao remover o pedido!");
    }
  };

  return (
    <main className="pagina-listagem-produtos-clientes pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <section className="banner-abas">
          <div className="titulo-banner">
            <h1>Listagem do Pedidos</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao
              nome="Análise de Clientes"
              navegacao="/analiseclientes"
            />
            <AbaNavegacao
              nome="Produtos Cadastrados"
              navegacao="/listagemprodutos"
            />
            <AbaNavegacao
              nome="Modificar Produtos"
              navegacao="/crudprodutos" />
            <AbaNavegacao
              nome="Modificar Vinicola/Pais"
              navegacao="/crudvinicolapais"
            />
            <AbaNavegacao
              nome="Lista de Pedidos"
              navegacao="/listapedidos"
              abaAtual={true}
            />
          </div>
        </section>

        <section className="pedidos-cliente">
          <section className="recarregar-dados">
            <i class="fa-solid fa-arrows-rotate" onClick={atualizarTabela}></i>
            <span>Atualizar Tabela</span>
          </section>

          <div className="listagem-pedidos-clientes">
            <table>
              <colgroup>
                <col className="numero-pedido" />
                <col className="quantidade-pedido" />
                <col className="nome-vinho-pedido" />
                <col className="valor-total-pedido" />
                <col className="contato" />
                <col className="status-pedido" />
                <col className="data-pedido" />
              </colgroup>
              <thead>
                <tr>
                  <th>Nº do Pedido</th>
                  <th>Quantidade</th>
                  <th>Nome do Vinho</th>
                  <th>Valor Total do Pedido</th>
                  <th>Contato</th>
                  <th>Status do Pedido</th>
                  <th>Data/Mês/Ano</th>
                </tr>
              </thead>
              <tbody>
                {listaPedidos.map((pedido, index) => (
                  <tr key={pedido.id_pedido}>
                    <td>
                      <div className="primeira-coluna">
                        {pedido.id_pedido}
                        <button>Ver Pedido Completo</button>
                      </div>
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
                          <div key={item.id_vinho}>{item.vinho}</div>
                        </div>
                      ))}
                    </td>
                    <td>
                      <div className="preco">
                        <span>R$</span>
                        {1000}
                      </div>
                    </td>
                    <td className="contato-cliente">{pedido.celular}</td>
                    <td>
                      <select
                        className="select-status-pedido"
                        value={pedido.status_pedido}
                        onChange={(e) => {
                          pedido.status_pedido = e.target.value;
                          setListaPedidos([...listaPedidos]);
                        }}
                      >
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                        <option value="ENVIADO">ENVIADO</option>
                        <option value="ENTREGUE">ENTREGUE</option>
                      </select>
                    </td>
                    <td>{pedido.data_pedido}</td>

                    <td>
                      <div className="manipulacao-lista-pedidos-cliente">
                        <button onClick={() => alterarPedidoCliente(index)}>
                          Alterar Pedido
                        </button>
                        <button
                          onClick={() => removerPedidoCliente(pedido.id_pedido)}
                        >
                          Excluir pedido
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </main>
  );
}
