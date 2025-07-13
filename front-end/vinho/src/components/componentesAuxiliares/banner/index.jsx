import "./index.scss";

export default function Banner(props) {
  return (
    <div className="comp-banner">
      <div>{props.children}</div>
    </div>
  );
}
