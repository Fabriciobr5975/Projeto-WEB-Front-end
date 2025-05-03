import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useState } from "react";
import axios from "axios";

export default function ListagemProdutos() {
  const [listaVinhos, setListaVinhos] = useState([]);
  const [nome, setNome] = useState("");

  async function Buscar() {
    try {
      let resp = await axios.get(`http://localhost:5001/estoque/vinho/${nome}`);
      setListaVinhos(resp.data);
      alert(`Produto(s) com nome "${nome}" buscado(s) com sucesso!`);
    } catch (error) {
      alert("Erro ao buscar vinhos: " + error.response?.status);
      console.error(error);
    }
  }

  return (
    <main className="pagina">
      <Header />
      <section className="banner-abas">
        <div className="abas-navegacao">
          <AbaNavegacao nome="Análise de Clientes" />
          <AbaNavegacao nome="Produtos Cadastrados" abaAtual={true} />
          <AbaNavegacao nome="Modificar Produtos" />
          <AbaNavegacao nome="Lista de Pedidos" />
        </div>
      </section>
      <section className="conteudo">
        <div className="pesquisa">
          <input
            type="text"
            placeholder="Insira o nome do vinho.."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input type="button" value="Buscar" onClick={Buscar} />
        </div>
        <table>
          <colgroup>
            <col className="id" />
            <col className="vinho" />
            <col className="descricao" />
            <col className="vinicola" />
            <col className="valor" />
            <col className="status" />
            <col className="estoque" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vinho</th>
              <th>Descrição</th>
              <th>Vinícola</th>
              <th>Valor Unitário</th>
              <th>Status Estoque</th>
              <th>Qtd Estoque</th>
            </tr>
          </thead>
          <tbody>
            {listaVinhos.map((item) => (
              <tr key={item.id}>
                <td>{item.id_vinho}</td>
                <td>
                  {item.vinho}
                  {item.imagem}
                </td>
                <td>{item.descricao}</td>
                <td>{item.vinicola_vinho}</td>
                <td>{item.preco_vinho}</td>
                <td>{item.status_estoque}</td>
                <td>{item.quantidade_estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Footer />
    </main>
  );
}
