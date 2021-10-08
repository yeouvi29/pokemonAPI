import PokemonCard from "./PokemonCard";

import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  const pokemonDatas = props.pokemonsData.map((data, i) => (
    <PokemonCard
      key={i}
      name={data.name}
      imgUrl={data.imgUrl}
      // isLoading={props.isLoading}
      id={data.id}
    />
  ));

  return (
    <div className={classes["cards--container"]}>
      <div className={classes["cards--container-inner"]}>{pokemonDatas}</div>
    </div>
  );
};

export default Pokedex;
