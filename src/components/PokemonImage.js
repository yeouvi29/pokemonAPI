import "./Card.module.css";

const Card = (props) => {
  return (
    <div>
      <img src={props.url} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
