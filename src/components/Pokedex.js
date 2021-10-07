import PokemonCard from "./PokemonCard";
import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  const pokemonDatas = props.data.map((data, i) => (
    <PokemonCard key={i} name={data.name} imgUrl={data.img} />
  ));

  return <div className={classes["cards--container"]}>{pokemonDatas}</div>;
};

export default Pokedex;
