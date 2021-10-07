import { useReducer } from "react";

import PokemonContext from "./pokemon-context";

const defaultState = {
  name: { count: 0, next: "", previous: "", results: [] },
  pokemonData: [],
  isNew: true,
  loading: false,
  error: "",
  getInfos: false,
};

const pokemonReducer = (state, action) => {
  if (action.type === "GET_NAME") {
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
    name: infoState.name,
    pokemonData: infoState.pokemonData,
    isNew: infoState.isNew,
    loading: infoState.loading,
    error: infoState.error,
    getInfos: infoState.getInfos,
    addName: addNamesHandler,
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
