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
            <AbaNavegacao nome="Modificar Produtos" navegacao="/crudprodutos" />
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
                {listaPedidos.map((pedido) => (
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
                    <td>{pedido.status_pedido}</td>
                    <td>{pedido.data_pedido}</td>
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
