import randomColor from "randomcolor";
import PokemonCard from "./PokemonCard";

import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  // send datas that are passed from Main component to child compoenents
  const pokemonDatas = props.pokedexData.map((data, i) => (
    <PokemonCard color={randomColor()} key={i} url={data.url} />
  ));

  return (
    <div className={classes["cards--container"]}>
      <div className={classes["cards--container-inner"]}>{pokemonDatas}</div>
    </div>
  );
};

export default Pokedex;
