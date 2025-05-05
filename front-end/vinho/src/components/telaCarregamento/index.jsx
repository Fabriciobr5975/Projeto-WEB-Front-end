import { useEffect, useState } from "react";
import "./index.scss";

export default function TelaCarregamento(props) {
  const [carregamento, setCarregamento] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = props.tituloPagina ?? "Viana Vinhos";

    setTimeout(() => {
      setCarregamento(false);
    }, props.tempo ?? 1000);
    
  }, [props?.tempo]);

  return (
    <main className={`comp-tela-carregamento ${carregamento ? "desfoque" : ""}`}>
      {props.children}
    </main>
  );
}
