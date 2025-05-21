import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TelaCarregamento from "../../components/telaCarregamento";
import AbaNavegacao from "../../components/abaNavegacao";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";


export default function CrudVinicolaPais() {
    const cliente = useMemo(() => {
        return JSON.parse(sessionStorage.getItem("cliente")) || {};
    }, []);

    const navigate = useNavigate();

    const [nomeVinicola, setNomeVinicola] = useState("");
    const [nomePais, setNomePais] = useState("");

    useEffect(() => {
        impedirAcessoTelaAdministrador(cliente, navigate);
    }, [cliente, navigate]);

    const [pais, setPais] = useState({
        id_pais: 0,
        pais: "",
        sigla: ""
    });

    const [vinicola, setVinicola] = useState({
        id_vinicola: 0,
        vinicola: "",
        rotulo: ""
    });

    const [listaVinicolas, setListarVinicola] = useState([]);
    const [listaPaises, setListarPaises] = useState([]);

    const [atualizarListaVinicola, setAtualizarListaVinicola] = useState(false);
    const [atualizarListaPais, setAtualizarListaPais] = useState(false);

    useEffect(() => {
        listarVinicola();
    }, [atualizarListaVinicola]);

    useEffect(() => {
        listarPais();
    }, [atualizarListaPais]);


    const limparCamposVinicola = () => {
        setVinicola((prevState) => ({
            ...prevState,
            id_vinicola: 0,
            vinicola: "",
            rotulo: ""
        }));
    };

    const limparCamposPais = () => {
        setPais((prevState) => ({
            ...prevState,
            id_pais: 0,
            pais: "",
            sigla: ""
        }));
    };




    async function BuscarVinicola() {
        try {
            const resp = await axios.get(`http://localhost:5001/vinicola/nome/${nomeVinicola}`);
            const vinicolaBuscado = resp.data[0];

            setVinicola(vinicolaBuscado);

            alert(
                `Vinícola(s) com nome "${vinicolaBuscado.vinicola}" buscada(s) com sucesso! `
            );
        } catch (error) {
            alert(error.response?.data?.erro ?? `Erro ao Buscar a vinícola ${vinicola.vinicola}`);
        }
    }

    async function BuscarPais() {
        try {
            const resp = await axios.get(`http://localhost:5001/pais/nome/${nomePais}`);
            const paisBuscado = resp.data[0];

            setPais(paisBuscado);

            alert(
                `País(es) com nome "${paisBuscado.pais}" buscado(s) com sucesso! `
            );
        } catch (error) {
            alert(error.response?.data?.erro ?? `Erro ao Buscar o pais ${pais.pais}`);
        }
    }

    async function cadastrarVinicola() {
        try {
            const url = `http://localhost:5001/vinicola`;

            await axios.post(url, vinicola);

            alert(`Cadastro realizado com sucesso da vinícola`);
            limparCamposVinicola();

        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro ao cadastrar a vinícola.");
        }
    }

    async function alterarVinicola() {
        try {
            const url = `http://localhost:5001/vinicola/${vinicola.id_vinicola}`;

            await axios.put(url, vinicola);

            alert(`Alteração realizada com sucesso na vinicola`);
            limparCamposVinicola();

        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro ao alterar a vinícola.");
        }
    }

    async function excluirVinicola() {
        try {
            await axios.delete(`http://localhost:5001/vinicola/${vinicola.id_vinicola}`);
            alert(`A vinícola (${vinicola.id_vinicola}) foi excluida com sucesso! `);

            limparCamposVinicola();
        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro para excluir a vinícola");
        }
    }

    const listarVinicola = async () => {
        try {
            const resp = await axios.get("http://localhost:5001/vinicola");
            const vinicola = resp.data;

            setListarVinicola(vinicola);
        } catch (error) {
            alert(
                error.response?.data?.erro ?? "Erro ao buscar as informações das vinícolas."
            );
        }
    };

    async function cadastrarPais() {
        try {
            const url = `http://localhost:5001/pais`;

            await axios.post(url, pais);

            alert(`Cadastro realizado com sucesso do país`);
            limparCamposPais();

        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro ao cadastrar o país.");
        }
    }

    async function alterarPais() {
        try {
            const url = `http://localhost:5001/pais/${pais.id_pais}`;

            await axios.put(url, pais);

            alert(`Alteração realizada com sucesso no país.`);
            limparCamposPais();

        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro ao alterar o país.");
        }
    }

    async function excluirPais() {
        try {
            await axios.delete(`http://localhost:5001/pais/${pais.id_pais}`);
            alert(`O país (${pais.id_pais}) foi excluido com sucesso! `);

            limparCamposPais();
        } catch (error) {
            alert(error.response?.data?.erro ?? "Erro para excluir o país");
        }
    }

    const listarPais = async () => {
        try {
            const resp = await axios.get("http://localhost:5001/pais");
            const pais = resp.data;

            setListarPaises(pais);
        } catch (error) {
            alert(
                error.response?.data?.erro ?? "Erro ao buscar as informações dos países."
            );
        }
    };

    async function atualizarPais() {
        setAtualizarListaPais((atualizar) => !atualizar);
    }

    async function atualizarVinicola() {
        setAtualizarListaVinicola((atualizar) => !atualizar);
    }

    return (
        <main className="pagina-crud-vinicola-pais pagina">
            <TelaCarregamento tempo={250}>
                <Header cliente={cliente} />
                <section className="banner-abas">
                    <div className="titulo-banner">
                        <h1>Manipulação das Vinicolas/Paises</h1>
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
                            navegacao="/crudprodutos"
                        />
                        <AbaNavegacao
                            nome="Modificar Vinicola/Pais"
                            abaAtual={true}
                            navegacao="/crudvinicolapais"
                        />
                        <AbaNavegacao
                            nome="Lista de Pedidos"
                            navegacao="/listapedidos"
                        />
                    </div>
                </section>
                <section className="conteudo">
                    <div className="container2">
                        <div className="container">
                            <div className="titulo">
                                <h1>
                                    <strong>VINICOLA</strong>
                                </h1>

                            </div>
                            <div className="container-conteudo">
                                <div className="pesquisa">
                                    <input type="button" value="Buscar" onClick={BuscarVinicola} />
                                    <input
                                        type="text"
                                        value={nomeVinicola}
                                        onChange={(e) => setNomeVinicola( e.target.value )}
                                        placeholder="Insira o nome da vinicola"
                                    />
                                </div>
                                <div className="dados">
                                    <div>
                                        <span>Identificação da Vinicola (ID):</span>
                                        <br />
                                        <input
                                            type="text"
                                            style={{ background: "#d0d0d0" }}
                                            value={vinicola.id_vinicola}
                                            onChange={(e) => setVinicola({ ...vinicola, id_vinicola: e.target.value })}
                                            placeholder="ID da vinicola"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="dados">
                                    <div>
                                        <span>Nome da Vinícola: </span>
                                        <br />
                                        <input
                                            type="text"
                                            value={vinicola.vinicola}
                                            onChange={(e) =>
                                                setVinicola({ ...vinicola, vinicola: e.target.value })
                                            }
                                            placeholder="Digite o nome da vinicola"
                                        />
                                    </div>
                                    <div>
                                        <span>Nome do Rotulo:</span>
                                        <br />
                                        <input
                                            type="text"
                                            value={vinicola.rotulo}
                                            onChange={(e) =>
                                                setVinicola({ ...vinicola, rotulo: e.target.value })
                                            }
                                            placeholder="Digite o nome do rotulo"
                                        />
                                    </div>
                                </div>
                                <div className="botoes-crud">
                                    <input type="button" value="Cadastrar" onClick={cadastrarVinicola} />
                                    <input type="button" value="Alterar" onClick={alterarVinicola} />
                                    <input type="button" value="Excluir" onClick={excluirVinicola} />
                                    <input type="button" value="Limpar" onClick={limparCamposVinicola} />
                                </div>




                            </div>

                        </div>

                        <div className="container">
                            <div className="titulo">
                                <h1>
                                    <strong>LISTAGEM VINICOLA</strong>
                                </h1>
                                <div className="recarregar-dados">
                                    <i
                                        class="fa-solid fa-arrows-rotate"
                                        onClick={() => atualizarVinicola()}
                                    ></i>

                                </div>
                            </div>
                            <table>
                                <colgroup>
                                    <col className="id" />
                                    <col className="Nome " />
                                    <col className="Rotulo" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Rotulo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaVinicolas.map((item) => (
                                        <tr key={item.id_vinicola}>
                                            <td>{item.id_vinicola}</td>
                                            <td>{item.vinicola}</td>
                                            <td>{item.rotulo}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="container">
                            <div className="titulo">
                                <h1>
                                    <strong>PAIS</strong>
                                </h1>
                            </div>
                            <div className="container-conteudo">
                                <div className="pesquisa">
                                    <input type="button" value="Buscar" onClick={BuscarPais} />
                                    <input
                                        type="text"
                                        value={nomePais}
                                        onChange={(e) => setNomePais(e.target.value )}
                                        placeholder="Insira o nome do pais"
                                    />
                                </div>
                                <div className="dados">
                                    <div>
                                        <span>Identificação Pais (ID):</span>
                                        <br />
                                        <input
                                            type="text"
                                            style={{ background: "#d0d0d0" }}
                                            value={pais.id_pais}
                                            onChange={(e) => setPais({ ...pais, id_pais: e.target.value })}
                                            placeholder="ID do Pais"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="dados">
                                    <div>
                                        <span>Nome do Pais: </span>
                                        <br />
                                        <input
                                            type="text"
                                            value={pais.pais}
                                            onChange={(e) => setPais({ ...pais, pais: e.target.value })}
                                            placeholder="Digite o nome do Pais"
                                        />
                                    </div>
                                    <div>
                                        <span>Sigla do Pais:</span>
                                        <br />
                                        <input
                                            type="text"
                                            value={pais.sigla}
                                            onChange={(e) => setPais({ ...pais, sigla: e.target.value })}
                                            placeholder="Digite a sigla do Pais"
                                        />
                                    </div>
                                </div>
                                <div className="botoes-crud">
                                    <input type="button" value="Cadastrar" onClick={cadastrarPais} />
                                    <input type="button" value="Alterar" onClick={alterarPais} />
                                    <input type="button" value="Excluir" onClick={excluirPais} />
                                    <input type="button" value="Limpar" onClick={limparCamposPais} />
                                </div>






                            </div>
                        </div>

                        <div className="container">
                            <div className="titulo">
                                <h1>
                                    <strong>LISTAGEM PAIS</strong>
                                </h1>
                                <div className="recarregar-dados">
                                    <i
                                        class="fa-solid fa-arrows-rotate"
                                        onClick={() => atualizarPais()}
                                    ></i>

                                </div>
                            </div>
                            <table>
                                <colgroup>
                                    <col className="id" />
                                    <col className="nome" />
                                    <col className="sigla" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Sigla</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaPaises.map((item) => (
                                        <tr key={item.id_pais}>
                                            <td>{item.id_pais}</td>
                                            <td>{item.pais}</td>
                                            <td>{item.sigla}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>



                </section>

                <Footer cliente={cliente} />

            </TelaCarregamento>
        </main >
    );
}