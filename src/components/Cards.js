import Card from "./PokemonName";
import "./Cards.module.css";

const Cards = (props) => {
  const pokemonCard = props.pokemons.map((data, i) => (
    <Card key={i} name={data.name} url={data.url} />
  ));
  return <div>{pokemonCard}</div>;
};

export default Cards;
