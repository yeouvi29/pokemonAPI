import { useReducer } from "react";

import PokemonContext from "./pokemon-context";

const defaultState = {
  name: [],
  pokemonData: [],
  loading: false,
  error: "",
  getInfos: false,
};

const pokemonReducer = (state, action) => {
  if (action.type === "GET_NAME") {
    const updatedName = [];
    console.log("isloading", state.loading);
    if (!state.name.length) {
      action.payload.forEach((data) => updatedName.push(data));
      console.log("updatedName", updatedName, action);
    }
    return {
      ...state,
      name: [...state.name, ...updatedName],
      getInfos: true,
    };
  } else if (action.type === "GET_INFO") {
    const updatedInfos = [];
    action.payload.forEach((data) => updatedInfos.push(data));
    return {
      ...state,
      pokemonData: [...updatedInfos],
      getInfos: false,
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

  const pokemonContext = {
    name: infoState.name,
    pokemonData: infoState.pokemonData,
    loading: infoState.loading,
    error: infoState.error,
    getInfos: infoState.getInfos,
    addName: addNamesHandler,
    addInfos: addInfosHandler,
    handleStatus: statusHandler,
  };
  return (
    <PokemonContext.Provider value={pokemonContext}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
