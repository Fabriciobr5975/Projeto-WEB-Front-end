import "./index.scss";

export default function Header(props) {
  return (
    <header className="header">
      <div className="elementos-header">
        <div className="logo"></div>

        <div className="input-header">
          <input
            type="text"
            placeholder="Search Your itens here..."
            className="campo-busca-homepage"
          />
        </div>

        <div className="dados-usuario-header">
          <span>
            Welcome, <strong>{'Paola Smith'}</strong>
          </span>
          <i class="fa-solid fa-circle-user icone"></i>
          <i class="fa-solid fa-cart-shopping icone"></i>
        </div>
      </div>
    </header>
  );
}
