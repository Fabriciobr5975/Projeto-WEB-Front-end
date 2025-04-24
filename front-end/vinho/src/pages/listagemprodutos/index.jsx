import Header from "../../components/header";
import Footer from "../../components/footer";


import { useState } from "react";
import axios from "axios";

import "./index.scss";

export default function ListagemProdutos() {

    const [listaVinhos, setListaVinhos] = useState([]);
    const [nome, setNome] = useState('');

    async function Buscar() {
        try {
            let resp = await axios.get(`http://localhost:5001/vinho/nome/${nome}`);
            setListaVinhos(resp.data);
            alert(`Produto(s) com nome "${nome}" buscado(s) com sucesso!`);
        } catch (error) {
            alert("Erro ao buscar vinhos: " + error.response?.status);
            console.error(error);
        }
    }
    

    return (
        <main>
            <Header />
            <section className="banner-abas">
                <div className="abas-navegacao">
                    <div className="aba">Análise de Clientes</div>
                    <div className="aba"><strong>Produtos Cadastrados</strong></div>
                    <div className="aba">Modificar Produtos</div>
                    <div className="aba">Lista de Pedidos</div>
                </div>
            </section>
            <section className="conteudo">
                <div className="pesquisa"> 
                    <input type="text" placeholder="Insira o nome do vinho.." value={nome} onChange={e => setNome(e.target.value)}/>
                    <input type="button" value="Buscar" onClick={Buscar}/>
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
                        {listaVinhos.map(item => (
                            <tr key={item.id}>
                                <td>{item.id_vinho}</td>
                                <td>{item.vinho}{item.imagem}</td>
                                <td>{item.vinho}</td>
                                <td>{item.vinicola}</td>
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
    )
} 