import { useReducer } from "react";

import PokemonContext from "./pokemon-context";

const defaultState = {
  url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
  name: { count: 0, next: "", previous: "", results: [] },
  pokemonData: [],
  isNew: true,
  loading: false,
  error: "",
  getInfos: false,
};

const pokemonReducer = (state, action) => {
  if (action.type === "ADD_URL") {
    return {
      ...state,
      url: action.payload,
    };
  } else if (action.type === "GET_NAME") {
    return {
      ...state,
      name: action.payload,
      isNew: false,
      getInfos: true,
    };
  } else if (action.type === "GET_INFO") {
    return {
      ...state,
      pokemonData: [...action.payload],
      getInfos: false,
    };
  } else if (action.type === "CLICK") {
    return {
      ...state,
      name: {
        count: state.count,
        next: state.next,
        previous: state.previous,
        results: [],
      },
      pokemonData: [],
      isNew: true,
    };
  } else if (action.type === "STATUS") {
    if (action.payload === "start") {
      console.log("start");
      return {
        ...state,
        loading: true,
      };
    } else if (action.payload === "success") {
      console.log("success");
      return {
        ...state,
        loading: false,
      };
    } else if (action.payload === "fail") {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
  console.log("action", action);

  return defaultState;
};
const PokemonProvider = (props) => {
  const [infoState, dispatchInfoAction] = useReducer(
    pokemonReducer,
    defaultState
  );

  const addUrlHandler = (url) => {
    dispatchInfoAction({ type: "ADD_URL", payload: url });
  };

  const addNamesHandler = (name) => {
    dispatchInfoAction({ type: "GET_NAME", payload: name });
  };

  const addInfosHandler = (data) => {
    dispatchInfoAction({ type: "GET_INFO", payload: data });
  };
  const statusHandler = (status, error) => {
    dispatchInfoAction({ type: "STATUS", payload: status, error });
  };
  const clickHandler = () => {
    dispatchInfoAction({ type: "CLICK" });
  };

  const pokemonContext = {
    url: infoState.url,
    name: infoState.name,
    pokemonData: infoState.pokemonData,
    isNew: infoState.isNew,
    loading: infoState.loading,
    error: infoState.error,
    getInfos: infoState.getInfos,
    setUrl: addUrlHandler,
    addPokemons: addNamesHandler,
    addInfos: addInfosHandler,
    handleStatus: statusHandler,
    handleClick: clickHandler,
  };
  return (
    <PokemonContext.Provider value={pokemonContext}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
