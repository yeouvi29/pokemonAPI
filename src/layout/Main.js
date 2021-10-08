import { useContext, memo, useState } from "react";

import Button from "../UI/Button";
import Pokedex from "../components/Pokedex";
import PokemonContext from "../store/pokemon-context";
import classes from "./Main.module.css";

const Main = () => {
  const [isNew, setIsNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [getNewData, setGetNewData] = useState(false);
  const pokemonCtx = useContext(PokemonContext);

  const prevClickHandler = () => {
    setIsNew(true);
    pokemonCtx.setUrl(pokemonCtx.name.previous);
  };

  const nextClickHandler = () => {
    setIsNew(true);
    pokemonCtx.setUrl(pokemonCtx.name.next);
  };

  const handleLoading = (boolean) => {
    setIsLoading(boolean);
  };

  const handleIsNew = (boolean) => {
    setIsNew(boolean);
  };

  const handleGetData = (boolean) => {
    setGetNewData(boolean);
  };

  return (
    <div className={classes.main}>
      <Button className={classes["button-left"]} onClick={prevClickHandler}>
        {pokemonCtx.name.previous && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
          ></i>
        )}
      </Button>

      <Pokedex
        handleLoading={handleLoading}
        handleIsNew={handleIsNew}
        handleGetData={handleGetData}
        isNew={isNew}
        isLoading={isLoading}
        getNewData={getNewData}
      />

      <Button className={classes["button-right"]} onClick={nextClickHandler}>
        {pokemonCtx.name.next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default memo(Main);
