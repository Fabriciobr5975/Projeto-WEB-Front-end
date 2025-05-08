import './index.scss'

export default function Vinho(props) {
  return (
    <section className="componente-vinho">
      <div className="imagem-vinho"></div>
      <div className="informacoes-vinho">
        <h5>VINOSIA LE SORBOLE - MALBEC RESERVA 2019</h5>
        <span>Suave</span>
        <p className="preco">R$ 3.000,00</p>
        <button className="btn-reversa-vinho">Reservar</button>
      </div>
    </section>
  );
}
