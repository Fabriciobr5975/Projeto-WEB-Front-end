import Header from "../../components/header";
import Footer from "../../components/footer";


import "./index.scss";

export default function CrudProdutos() {
    return (
        <main>
            <Header />
            <section className="banner-abas">
                <div className="abas-navegacao">
                    <div className="aba">Análise de Clientes</div>
                    <div className="aba">Produtos Cadastrados</div>
                    <div className="aba"><strong>Modificar Produtos</strong></div>
                    <div className="aba">Lista de Pedidos</div>
                </div>
            </section>
            <section className="conteudo">
                <div className="pesquisa1"><input type="button" value="Buscar" /> <input type="text" placeholder="Insira um ID" /></div>
                <div className="busca-imagem-campos">
                    <div className="inserir-imagem"><input type="file" /></div>
                    <div> Nome :<br /> <input type="text" /> </div>
                    <div> Classificação :<br /> <input type="text"  /> </div>
                    <div> Vinicola :<br /> <input type="text"  /> </div>
                    <div> Marca :<br /> <input type="text"  /> </div>
                </div>
                <div className="campos-descricao-botao">
                    <div> Uva :<input type="text" className="text1space" /> </div>
                    <div> Teor Alcoólico :<input type="text" className="text1space" /> </div>
                    <div> Volume :<input type="text" className="text1space" /> </div>
                    <div> Temperatura p/ Servir :<input type="text" className="text2space" /> </div>
                    <div> Pais :<input type="text" className="text1space" /> </div>
                    <div> Safra :<input type="text" className="text1space" /> </div>
                    <div> Preço (Un) :<input type="text" className="text1space" /></div>
                    <div className="descricao"> Descrição : <br /><textarea className="area-descricao"/> </div>
                    
                    <div className="botao"><input type="button" value="Cadastrar" /> </div>
                    <div className="botao"><input type="button" value="Alterar" /> </div>
                    <div className="botao"><input type="button" value="Excluir" /> </div>

                </div>





            </section>
            <Footer />
        </main>
    );
}