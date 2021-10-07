import { useEffect, useContext, Fragment, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import PokemonContext from "../store/pokemon-context";
const Pokedex = () => {
  const pokemonCtx = useContext(PokemonContext);

  const pokemonName = pokemonCtx.name.map((name, i) => (
    <PokemonCard key={i} name={name} />
  ));

  const fetchData = useCallback(async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    const getDatas = async () => {
      const result = pokemonCtx.name.map(async (name) => {
        const res = await fetchData(`https://pokeapi.glitch.me/v1/pokemon/1`);
        console.log("res!!", res);
        return res;
      });
    };
    const getNames = async () => {
      if (!pokemonCtx.loading) pokemonCtx.handleStatus("start");
      try {
        const res = await fetchData(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
        );
        const data = await res.results.map((data) => data.name);
        pokemonCtx.addName(data);

        if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
      } catch (err) {
        pokemonCtx.handleStatus("error", err.message);
      }
    };

    // console.log("length", pokemonCtx.name.length);
    if (pokemonCtx.name.length === 0) {
      console.log("here", pokemonCtx.name.length);
      getNames();
    }
    // if (pokemonCtx.getInfos && !pokemonCtx.loading) getDatas();
  }, [fetchData, pokemonCtx]);

  return <Fragment>{pokemonName}</Fragment>;
};

export default Pokedex;
