import React from "react";

const PokemonContext = React.createContext({
  name: { count: 0, next: "", previous: "", results: [] },
  pokemonData: [],
  isNew: true,
  loading: false,
  error: "",
  getInfos: false,
  addName: (name) => {},
  addInfos: (data) => {},
  handleStatus: (status, err) => {},
  handleClick: () => {},
});

export default PokemonContext;
