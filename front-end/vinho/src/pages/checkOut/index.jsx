import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TelaCarregamento from "../../components/telaCarregamento";
import { useState, useEffect } from "react";
import axios from "axios";



export default function CheckOut() {
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



                            <div className="total">
                                <h5>SubTotal:</h5><h5><strong>R$ 59,99</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="titulo">
                            <h1><strong>2. ENDEREÇO DE ENTREGA</strong> </h1>
                        </div>
                        <div className="container-conteudo">
                            <div>
                                <input
                                    type="text"
                                    // value={id}
                                    // onChange={(e) => setId(e.target.value)}
                                    placeholder="lista de endereço(s)"
                                />
                                <input type="button" value="Adicionar Novo" />
                            </div>
                            <div>

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
                                <div className="total">
                                    <h5>SubTotal:</h5><h5><strong>R$ 59,99</strong></h5>
                                </div>
                            </div>
                            <div className="container-conteudo">
                                <div className="button">
                                    <input type="button" value="Finalizar Compra" />
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