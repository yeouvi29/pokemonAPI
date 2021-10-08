import PokemonCard from "./PokemonCard";

import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  const pokemonDatas = props.names.map((data, i) => (
    <PokemonCard key={i} url={data.url} />
  ));

  return (
    <div className={classes["cards--container"]}>
      <div className={classes["cards--container-inner"]}>{pokemonDatas}</div>
    </div>
  );
};

export default Pokedex;
