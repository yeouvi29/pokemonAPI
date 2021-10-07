import { useContext, memo } from "react";

import Button from "../UI/Button";
import Pokedex from "../components/Pokedex";
import PokemonContext from "../store/pokemon-context";
import classes from "./Main.module.css";

const Main = () => {
  const pokemonCtx = useContext(PokemonContext);

  const prevClickHandler = () => {
    pokemonCtx.handleClick();
    pokemonCtx.setUrl(pokemonCtx.name.previous);
  };

  const nextClickHandler = () => {
    pokemonCtx.handleClick();
    pokemonCtx.setUrl(pokemonCtx.name.next);
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

      <Pokedex data={pokemonCtx.pokemonData} />

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
