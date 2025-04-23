import Header from "../../components/header";
import Footer from "../../components/footer";


import "./index.scss";

export default function ListagemProdutos() {
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
                <div className="pesquisa"> <input type="text" placeholder="Insira um ID" /><input type="button" value="Buscar" /></div>
                <table>
                    <colgroup>
                        <col className="id"/>
                        <col className="vinho"/>
                        <col className="descricao"/>
                        <col className="vinicola"/>
                        <col className="valor"/>
                        <col className="status"/>
                        <col className="estoque"/>
                        
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
                        {/* {ListarProdutos.map(item =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nome}{item.imagem}</td>
                                <td>{item.descricao}</td>
                                <td>{item.vinicola}</td>
                                <td>{item.valor}</td>
                                <td>{item.status}</td>
                                <td>{item.qtd}</td>
                            </tr>
                        )} */}
                    </tbody>
                </table>



            </section>



            <Footer />
        </main>
    )
} 