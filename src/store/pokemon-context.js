import React from "react";

const PokemonContext = React.createContext({
  name: [],
  pokemonData: [],
  loading: false,
  error: "",
  getInfos: false,
  addName: (name) => {},
  addInfos: (data) => {},
  handleStatus: (status, err) => {},
});

export default PokemonContext;
