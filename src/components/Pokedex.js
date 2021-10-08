import { useCallback, useContext, useEffect, useState } from "react";

import PokemonCard from "./PokemonCard";
import PokemonContext from "../store/pokemon-context";
import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  // const [names, setNames] = useState({});
  // pokemonData: [],
  // const [isNew, setIsNew] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [getNewData, setGetNewData] = useState(false);
  const pokemonCtx = useContext(PokemonContext);

  const pokemonDatas = pokemonCtx.pokemonData.map((data, i) => (
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
