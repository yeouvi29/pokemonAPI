import { useContext } from "react";
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
      <button
        className={`${classes.buttons}  ${classes["button-left"]}`}
        onClick={prevClickHandler}
      >
        {pokemonCtx.name.previous && (
          <i
            className={`fas fa-chevron-left ${classes.arrow} ${classes["arrow-left"]}`}
          ></i>
        )}
      </button>

      <Pokedex data={pokemonCtx.pokemonData} />

      <button
        className={`${classes.buttons}  ${classes["button-right"]}`}
        onClick={nextClickHandler}
      >
        {pokemonCtx.name.next && (
          <i
            className={`fas fa-chevron-right ${classes.arrow} ${classes["arrow-right"]}`}
          ></i>
        )}
      </button>
    </div>
  );
};

export default Main;
