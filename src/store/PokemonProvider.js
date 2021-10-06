import { useReducer } from "react";

import PokemonContext from "./pokemon-context";

const defaultState = {
  name: [],
  pokemonData: [],
};

const pokemonReducer = (props) => {
  return defaultState;
};
const PokemonProvider = (props) => {
  const [infoState, dispatchInfoAction] = useReducer(
    pokemonReducer,
    defaultState
  );

  const pokemonContext = {
    name: infoState.name,
    pokemonData: infoState.pokemonData,
  };
  return (
    <PokemonContext.Provider value={pokemonContext}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
