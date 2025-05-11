import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PedidosCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);
  
  const [cpfCliente] = useState(cliente.cpf);
  const [listaPedidos, setListaPedidos] = useState([]);

  const listarPedidos = useCallback(async () => {
    try {
      const url = `http://localhost:5001/pedido/busca/cliente?cliente=${cpfCliente}`;

      const resp = await axios.get(url);
      const pedidos = resp.data;

      setListaPedidos(Object.values(pedidos));
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
    <div className="pagina-pedidos-cliente pagina">
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
              abaAtual={true}
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
                <col className="nome-vinho-pedido" />
                <col className="status-pedido" />
                <col className="data-pedido" />
              </colgroup>
              <thead>
                <tr>
                  <th>Nº do Pedido</th>
                  <th>Quantidade</th>
                  <th>Nome do Vinho</th>
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
    </div>
  );
}
