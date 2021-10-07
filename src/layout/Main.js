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
      {pokemonCtx.name.previous && (
        <button className={classes.buttons} onClick={prevClickHandler}>
          <i className={`fas fa-chevron-left ${classes.arrow}`}></i>
        </button>
      )}

      <Pokedex data={pokemonCtx.pokemonData} />

      {pokemonCtx.name.next && (
        <button className={classes.buttons} onClick={nextClickHandler}>
          <i className={`fas fa-chevron-right ${classes.arrow}`}></i>
        </button>
      )}
    </div>
  );
};

export default Main;
