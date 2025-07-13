import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";
//import Banner from "../../components/banner";

export default function PerguntasFrequentes() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  return (
    <div className="pagina-perguntas pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <main className="conteudo-perguntas-frequentes">
          <div className="banner-perguntas-frequentes">
            <h1>Perguntas Frequentes</h1>
          </div>
          <div className="informacoes">
            <div className="pergunta-resposta">
              <div className="pergunta">
                <p>
                  Os apreciadores de vinho sabem que fazer parte do mundo da
                  viticultura é mais um estilo de vida do que uma simples
                  decisão. Há uma arte não só em fazer vinho, mas também em
                  apreciá-lo. Porém, tudo isso vem com uma enxurrada de
                  perguntas sobre vinho e cultura do vinho. A complexidade dos
                  perfis de sabor e da bebida, às vezes, pode ser um pouco
                  intimidante para os recém-chegados.
                  <br />
                  <br />
                  Para ajudar um pouco nisso trazemos 10 perguntas mais sobre
                  vinho compartilhadas pelo especialista em vinhos Jason
                  McClain, em seu site.
                  <br />
                </p>
              </div>
              <div className="pergunta">
                <p>
                  <strong>
                    1. Quais são as coisas mais importantes a considerar ao
                    combinar vinho com comida?{" "}
                  </strong>
                </p>
                <div className="resposta">
                  <p>
                    Apesar de ser mais de preferência pessoal, existem
                    orientações comumente conhecidas ao emparelhar certos
                    alimentos com variedades específicas de vinho,
                    principalmente, os alimentos precisam combinar com o vinho
                    em intensidade de sabor. Os vinhos tintos combinam bem com
                    sabores e carnes ousadas, enquanto os brancos combinam bem
                    com carnes mais leves, como frango e/ou peixe.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>2. O preço realmente importa?</strong>{" "}
                </p>
                <div className="resposta">
                  <p>
                    {" "}
                    Embora a qualidade seja, obviamente, mais alta, muitas das
                    uvas usadas na fabricação de vinhos caros são da mesma vinha
                    que as usadas para fazer variedades mais baratas. Às vezes,
                    eles também são elaborados pelo mesmo enólogo. Geralmente,
                    quanto maior o preço, mais notáveis ​​os aromas e mais
                    vibrantes os sabores.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>3. Todos os vinhos melhoram com a idade?</strong>{" "}
                </p>
                <div className="resposta">
                  <p>
                    Esta é uma das perguntas mais frequentes sobre o vinho. Como
                    qualquer vinho passa pelo processo de envelhecimento,
                    desencadeia uma reação química complexa entre os ácidos,
                    açúcares e substâncias conhecidas como compostos fenólicos.
                    Esses compostos fenólicos podem não apenas alterar o sabor
                    (geralmente para melhor, mas nem sempre), mas também o aroma
                    e a coloração. Níveis mais altos de fenol no vinho (certos
                    tipos de Syrah, Nebbiolo) significam que ele envelhecerá
                    bem. O vinho com baixo nível de fenol normalmente não
                    envelhece muito bem. Um vinho que envelhece
                    extraordinariamente, ou aqueles que são “construídos para
                    envelhecer”, são incrivelmente raros
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>4. O que é tanino?</strong>{" "}
                </p>
                <div className="resposta">
                  <p>
                    Os taninos são um grupo de compostos fenólicos, adquiridos
                    da casca, sementes e caules das uvas. Eles são de
                    importância distinta no que diz respeito ao sabor de um
                    vinho específico após o processo de envelhecimento. Os
                    taninos são um conservante natural e dão ao vinho uma
                    sensação seca, que é especialmente aparente no retrogosto da
                    maioria dos vinhos tintos (aquela conhecida sensação de boca
                    seca). Embora os vinhos tintos e brancos tenham taninos, é
                    consideravelmente mais aparente nas variedades de vinho
                    tinto.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>5. Beber vinho é bom para você?</strong>{" "}
                </p>
                <div className="resposta">
                  <p>
                    Desde que seja com moderação, um vinho tinto realmente
                    oferece vários benefícios, incluindo proteção contra doenças
                    cardíacas e inflamações, colesterol mais baixo e mais
                    antioxidantes do que o vinho branco.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>6. Como devo armazenar meu vinho?</strong>{" "}
                </p>
                <div className="resposta">
                  <p>
                    Outra dúvida comum sobre o vinho diz respeito ao
                    armazenamento. As garrafas fechadas devem ser mantidas em
                    local seco, escuro, com baixa umidade e temperatura
                    adequada. Certifique-se de que eles não sejam armazenados na
                    posição vertical. As garrafas que foram abertas podem ser
                    armazenadas na geladeira por até uma semana.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>
                    7. Quanto tempo dura o vinho depois de aberto?
                  </strong>
                </p>
                <div className="resposta">
                  <p>
                    Geralmente, uma garrafa de vinho aberta dura de 5 a 7 dias
                    se armazenada na geladeira. Com o passar do tempo, e à
                    medida que o vinho oxida, haverá mudanças sutis no sabor.
                    Particularmente, o frutado se dissipa e a vibração diminui
                    com o tempo.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>8. Por que nem todos os vinhos são veganos?</strong>
                </p>
                <div className="resposta">
                  <p>
                    Muitos vinhos não podem ser considerados veganos nem
                    vegetarianos devido a algo chamado processo de 'fining'.
                    Considerando que alguns dos agentes clarificantes mais
                    comuns não são aceitáveis ​​para veganismo ou vegetarianismo
                    – como proteína do leite, proteínas animais, claras de ovos
                    e proteína da bexiga de peixe – faz sentido.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>
                    9. A qualidade da taça de vinho realmente faz diferença?
                  </strong>
                </p>
                <div className="resposta">
                  <p>
                    Isso vai depender em grande parte de quem você perguntar –
                    alguns ainda afirmam que a forma do copo de vinho é o que
                    realmente importa. Taças menores tendem a aumentar a
                    intensidade, enquanto taças de vinho maiores estimulam uma
                    complexidade mais aromática.
                  </p>
                </div>
              </div>
              <div className="pergunta">
                <p>
                  {" "}
                  <strong>10. Sulfitos, o que são e são perigosos?</strong>
                </p>
                <div className="resposta">
                  <p>
                    Os sulfitos são compostos químicos naturais encontrados no
                    vinho. Embora em grau variável, os sulfitos são encontrados
                    em todos os vinhos. Eles são os mais baixos em vinhos
                    tintos, enquanto o vinho branco doce tem o maior teor de
                    sulfito. Eles não são perigosos, embora raramente possam
                    causar uma reação alérgica leve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
