import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TelaCarregamento from "../../components/telaCarregamento";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function CheckOut() {

    const navigate = useNavigate();
    return (
        <main className="pagina-check-out">
            <TelaCarregamento tempo={250}>
                <Header />
                <section className="banner-abas">
                    <div className="titulo-banner">
                        <h1>Check - Out</h1>
                    </div>
                </section>
                <section className="conteudo">
                    <div className="container">
                        <div className="titulo">
                            <h1><strong>1. REVISÃO DOS ITENS</strong> </h1>
                        </div>
                        <div className="container-conteudo">
                            <div className="itens-revisao">
                                {[1, 2].map((item, index) => (
                                    <div className="item-revisao" key={index}>
                                        <img src="/assets/images/vinho-exemplo.svg" alt="Produto" />
                                        <div className="info">
                                            <strong>Nome: Cabernet Sauvignon</strong>
                                            <span>Marca: Salton</span>
                                            <div className="quantidade-preco">
                                                <div className="quantidade">
                                                    <span>Quantidade: 1</span>
                                                </div>
                                                <span className="preco">R$ 59,90</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="total">
                            <span><h3>Total:</h3>  </span> <span><h3><strong>R$ 59,99</strong></h3></span>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="titulo">
                            <h1><strong>2. ENDEREÇO DE ENTREGA</strong> </h1>
                        </div>
                        <div className="container-conteudo">
                            <div className="busca">
                                <input
                                    type="text"
                                    // value={id}
                                    // onChange={(e) => setId(e.target.value)}
                                    placeholder="lista de endereço(s)"
                                />
                                <input type="button" value="Adicionar Novo" />
                            </div>
                            <div className="container-conteudo-endereco">
                                <div className="campo">
                                    <span> Apelido do Endereço: </span>
                                    <input type="text" />
                                </div>
                                <div className="campo-duplo1">
                                    <div className="campo">
                                        <span> Primeiro Nome: </span>
                                        <input type="text" />
                                    </div>
                                    <div className="campo">
                                        <span> Último Nome: </span>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="campo-duplo2">
                                    <div className="campo">
                                        <span> Estado: </span>
                                        <input type="text" />
                                    </div>
                                    <div className="campo">
                                        <span> Cidade: </span>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="campo">
                                    <span> Bairro: </span>
                                    <input type="text" />
                                </div>
                                <div className="campo">
                                    <span> Logradouro: </span>
                                    <input type="text" />
                                </div>
                                <div className="campo-duplo2">
                                    <div className="campo">
                                        <span> Número: </span>
                                        <input type="text" />
                                    </div>
                                    <div className="campo">
                                        <span> CEP: </span>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="campo">
                                    <span> E-mail: </span>
                                    <input type="text" />
                                </div>
                                <div className="campo">
                                    <span> Número para Contato: </span>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="container">
                            <div className="titulo">
                                <h1><strong>3. SELECIONE MÉTODOS DE PAGAMENTO</strong> </h1>
                            </div>
                            <div className="container-conteudo">
                                <div className="opcoes">
                                    <div className="opcao">
                                        <input type="checkbox" /> <span>Cartão Débito</span>
                                    </div>
                                    <div className="opcao">
                                        <input type="checkbox" /> <span>Cartão Crédito</span>
                                    </div>
                                    <div className="opcao">
                                        <input type="checkbox" /> <span>Pix</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="container">
                            <div className="titulo">
                                <h1><strong>4. SUMÁRIO DO PEDIDO</strong></h1>
                            </div>
                            <div className="container-conteudo">
                                <div className="opcoes">
                                    <div className="opcao">
                                        <input type="checkbox" /> <span>Cartão Crédito</span>
                                    </div>
                                    <div className="opcao">
                                        <input type="checkbox" /> <span>Pix</span>
                                    </div>
                                </div>
                                <div className="resumo-item">
                                    <div className="info-vinho">
                                        <span className="quantidade">1</span>
                                        <span className="nome">Nome: Carbenet Sauvignon</span>
                                    </div>
                                    <span className="preco">R$ 59,90</span>
                                </div>
                                <div className="total">
                                    <span><h3>Total:</h3>  </span> <span><h3><strong>R$ 59,99</strong></h3></span>
                                </div>
                            </div>
                            <div className="container-conteudo">
                                <div className="button">
                                    <input type="button" value="Finalizar Compra" onClick={() => navigate("/confirmacaopedido")} />
                                </div>
                            </div>


                        </div>
                    </div>

                </section>
                <Footer />

            </TelaCarregamento>
        </main>
    );
}