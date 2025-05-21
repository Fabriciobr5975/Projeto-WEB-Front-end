import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TelaCarregamento from "../../components/telaCarregamento";
import AbaNavegacao from "../../components/abaNavegacao";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { calcularValorTotalCarrinho } from "../../service/calculosCarrinho/calculosCarrinhoCliente";
import { imprimirNumeroComVirgula } from "../../utils/conversaoUtil";

export default function CrudVinicolaPais() {
    const cliente = useMemo(() => {
        return JSON.parse(sessionStorage.getItem("cliente")) || {};
    }, []);

    const navigate = useNavigate();

    async function BuscarVinicola() {

    }
    async function BuscarPais() {

    }
    async function cadastrarVinicola() {

    }
    async function alterarVinicola() {

    }
    async function excluirVinicola() {

    }
    async function limparVinicola() {

    }
    async function cadastrarPais() {

    }
    async function alterarPais() {

    }
    async function excluirPais() {

    }
    async function limparPais() {

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
                                        // value={id}
                                        // onChange={(e) => setId(e.target.value)}
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
                                            // value={vinho.id_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, id_vinho: e.target.value })
                                            // }
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
                                            // value={vinho.nome_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, nome_vinho: e.target.value })
                                            // }
                                            placeholder="Digite o nome da vinicola"
                                        />
                                    </div>
                                    <div>
                                        <span>Nome do Rotulo:</span>
                                        <br />
                                        <input
                                            type="text"
                                            // value={vinho.nome_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, nome_vinho: e.target.value })
                                            // }
                                            placeholder="Digite o nome do rotulo"
                                        />
                                    </div>
                                </div>
                                <div className="botoes-crud">
                                    <input type="button" value="Cadastrar" onClick={cadastrarVinicola} />
                                    <input type="button" value="Alterar" onClick={alterarVinicola} />
                                    <input type="button" value="Excluir" onClick={excluirVinicola} />
                                    <input type="button" value="Limpar" onClick={limparVinicola} />
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
                                    // onClick={atualizarTabela}
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
                                        // value={id}
                                        // onChange={(e) => setId(e.target.value)}
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
                                            // value={vinho.id_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, id_vinho: e.target.value })
                                            // }
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
                                            // value={vinho.nome_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, nome_vinho: e.target.value })
                                            // }
                                            placeholder="Digite o nome do Pais"
                                        />
                                    </div>
                                    <div>
                                        <span>Sigla do Pais:</span>
                                        <br />
                                        <input
                                            type="text"
                                            // value={vinho.nome_vinho}
                                            // onChange={(e) =>
                                            //     setVinho({ ...vinho, nome_vinho: e.target.value })
                                            // }
                                            placeholder="Digite a sigla do Pais"
                                        />
                                    </div>
                                </div>
                                <div className="botoes-crud">
                                    <input type="button" value="Cadastrar" onClick={cadastrarPais} />
                                    <input type="button" value="Alterar" onClick={alterarPais} />
                                    <input type="button" value="Excluir" onClick={excluirPais} />
                                    <input type="button" value="Limpar" onClick={limparPais} />
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
                                    // onClick={atualizarTabela}
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