import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
//import Banner from "../../components/banner";

export default function Vinicola() {
    const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

    return (
        <div className="pagina-vinicola">
            <TelaCarregamento tempo={250}>
                <Header cliente={cliente} />
                <main className="vinicola">
                    <div className="banner">
                        <h1>Vinícola(s)</h1>
                    </div>
                    <div className="informacoes-vinicolas">
                        <div className="introducao">
                            <p> Sejam bem-vindos à nossa apresentação de fornecedores – o ponto de encontro entre 
                                a excelência e a inovação no universo dos vinhos. Hoje, temos o prazer de mostrar 
                                os parceiros que selecionamos com rigor para compor nosso portfólio.</p>
                            <p> Cada fornecedor foi escolhido pela qualidade inquestionável dos rótulos e pelo 
                                compromisso com práticas modernas que elevam o padrão da nossa seleção.
                            </p>
                        </div>
                        <div className="informacao-vinicola1">
                            <picture className="logo">
                                <img
                                    src="/assets/images/xv-de-novembro.svg"
                                    alt="Vinícola XV de Novembro"
                                />
                            </picture>
                            <div className="descricao-vinicola">
                                <h2><strong>XV de Novembro</strong></h2>
                                <p> Fundada por Brasílio Augusto de Moraes e hoje administrada por seu filho e por seu neto,
                                    a Vinícola XV de Novembro já soma 60 anos de uma produção feita a partir de vinhedos
                                    selecionados e cultivados com atenção e respeito pela terra e pelo fruto. Nosso objetivo
                                    é agradar aos mais variados e exigentes paladares e valorizar a experiência de degustar
                                    um vinho elaborado dentro dos mais minuciosos padrões de qualidade.
                                </p>
                            </div>
                        </div>
                        <div className="informacao-vinicola2">
                            <picture className="logo">
                                <img
                                    src="/assets/images/goes.svg"
                                    alt="Vinícola Góes"
                                />
                            </picture>
                            <div className="descricao-vinicola">
                                <h2><strong>Vinícola Góes</strong></h2>
                                <p> Na década de 30, mais precisamente no ano de 1938, os vinhos passaram a ser comercializados
                                    oficialmente pela Família Góes: eram envasados em barris de 100 litros e despachados na
                                    estação ferroviária do bairro para o litoral. Os vinhos iam acompanhados da quantidade
                                    precisa de rótulos e selos, para que os comerciantes pudessem afixá-los nos vasilhames,
                                    dando prova do controle e garantia de boa procedência da bebida.
                                </p>
                            </div>
                        </div>

                    </div>

                </main>
                <Footer cliente={cliente} />
            </TelaCarregamento>
        </div>
    )
}