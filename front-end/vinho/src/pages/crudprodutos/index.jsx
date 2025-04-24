import Header from "../../components/header";
import Footer from "../../components/footer";

import { useState } from "react";
import axios from "axios";

import "./index.scss";

export default function CrudProdutos() {

    const [id, setId] = useState('');

    const [nome, setNome] = useState('');
    const [classif, setClassif] = useState('');
    const [imagem, setImagem] = useState([]);
    const [vinicola, setVinicola] = useState('');
    const [marca, setMarca] = useState('');
    const [uva, setUva] = useState('');
    const [teor, setTeor] = useState('');
    const [volume, setVolume] = useState('');
    const [temp, setTemp] = useState('');
    const [pais, setPais] = useState('');
    const [safra, setSafra] = useState('');
    const [preco, setPreco] = useState('');
    const [descr, setDescr] = useState('');


    async function Cadastrar() {
        let corpo = {
            "nome_vinho": nome,
            "classificacao_vinho": classif,
            "imagem": imagem,
            "vinicola": vinicola,
            "marca": marca,
            "uva_vinho": uva,
            "teor_alcolico": teor,
            "volume_vinho": volume,
            "temperatura_servir": temp,
            "pais": pais,
            "safra_vinho": safra,
            "preco_vinho": preco,
            "descricao": descr
        }
        let resp = await axios.post('http://localhost:5001/vinho', corpo);
        alert(`produto cadastrado com sucesso! (${resp.data.novoId})`);

        // limpar();
    }

    async function Alterar() {
        let corpo = {
            "nome_vinho": nome,
            "classificacao_vinho": classif,
            "imagem": imagem,
            "vinicola": vinicola,
            "marca": marca,
            "uva_vinho": uva,
            "teor_alcolico": teor,
            "volume_vinho": volume,
            "temperatura_servir": temp,
            "pais": pais,
            "safra_vinho": safra,
            "preco_vinho": preco,
            "descricao": descr
        }
        let resp = await axios.put(`http://localhost:5001/vinho/${id}`, corpo);
        alert(`O produto (${resp.data.nome}) foi alterado com sucesso!`);

        limpar();
    }

    async function Excluir() {
        let resp = await axios.delete(`http://localhost:5001/${id}`);
        alert(`O produto (${resp.data.nome}) foi excluido com sucesso! `);
    }
    async function Buscar() {
        let resp = await axios.get(`http://localhost:5001/vinho/${id}`);
        setNome(resp.data.nome_vinho);
        setClassif('');
        setImagem(null);
        setVinicola('');
        setMarca('');
        setUva('');
        setTeor('');
        setVolume('');
        setTemp('');
        setPais('');
        setSafra('');
        setPreco('');
        setDescr('');
        alert(`Produto(s) com nome "${resp.data.nome_vinho}" buscado(s) com sucesso! `);
    }
    function limpar() {
        setNome('');
        setClassif('');
        setImagem(null);
        setVinicola('');
        setMarca('');
        setUva('');
        setTeor('');
        setVolume('');
        setTemp('');
        setPais('');
        setSafra('');
        setPreco('');
        setDescr('');
    }

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
                <div className="pesquisa1"><input type="button" value="Buscar" onClick={Buscar} />
                    <input type="text"  value={id} onChange={e => setId(e.target.value)} />
                </div>
                <div className="busca-imagem-campos">
                    <div className="inserir-imagem"><input type="file" /></div>
                    <div> Nome :<br /> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>
                    <div> Classificação :<br /> <input type="text" value={classif} onChange={e => setClassif(e.target.value)} /> </div>
                    <div> Vinicola :<br /> <input type="text" value={vinicola} onChange={e => setVinicola(e.target.value)} /> </div>
                    <div> Marca :<br /> <input type="text" value={marca} onChange={e => setMarca(e.target.value)} /> </div>
                </div>
                <div className="campos-descricao-botao">
                    <div> Uva :<input type="text" value={uva} onChange={e => setUva(e.target.value)} /> </div>
                    <div> Teor Alcoólico :<input type="text" value={teor} onChange={e => setTeor(e.target.value)} /> </div>
                    <div> Volume :<input type="text" value={volume} onChange={e => setVolume(e.target.value)} /> </div>
                    <div> Temperatura p/ Servir :<input type="text" value={temp} onChange={e => setTemp(e.target.value)} /> </div>
                    <div> Pais :<input type="text" value={pais} onChange={e => setPais(e.target.value)} /> </div>
                    <div> Safra :<input type="text" value={safra} onChange={e => setSafra(e.target.value)} /> </div>
                    <div> Preço (Un) :<input type="text" value={preco} onChange={e => setPreco(e.target.value)} /></div>
                    <div className="descricao"> Descrição : <br />
                        <textarea className="area-descricao" value={descr} onChange={e => setDescr(e.target.value)} />
                    </div>

                    <div className="botao"><input type="button" value="Cadastrar" onClick={Cadastrar} /> </div>
                    <div className="botao"><input type="button" value="Alterar" onClick={Alterar} /> </div>
                    <div className="botao"><input type="button" value="Excluir" onClick={Excluir} /> </div>

                </div>





            </section>
            <Footer />
        </main>
    );
}