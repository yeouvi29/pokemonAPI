import React from "react";

const PokemonContext = React.createContext({
  url: "",
  name: { count: 0, next: "", previous: "", results: [] },
  pokemonData: [],
  isNew: true,
  loading: false,
  error: "",
  getInfos: false,
  setUrl: (url) => {},
  addPokemons: (name) => {},
  addInfos: (data) => {},
  handleStatus: (status, err) => {},
  handleClick: () => {},
});

export default PokemonContext;
