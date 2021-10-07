import { Fragment } from "react";
import PokemonCard from "./PokemonCard";

const Pokedex = (props) => {
  const pokemonDatas = props.data.map((data, i) => (
    <PokemonCard key={i} name={data.name} imgUrl={data.img} />
  ));

  return <Fragment>{pokemonDatas}</Fragment>;
};

export default Pokedex;
