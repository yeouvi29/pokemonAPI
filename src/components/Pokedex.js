import { useCallback, useContext, useEffect, useState } from "react";

import PokemonCard from "./PokemonCard";
import PokemonContext from "../store/pokemon-context";
import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  const [isNew, setIsNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const pokemonCtx = useContext(PokemonContext);

  const pokemonDatas = props.data.map((data, i) => (
    <PokemonCard
      key={i}
      name={data.name}
      imgUrl={data.imgUrl}
      isLoading={isLoading}
      id={data.id}
    />
  ));

  const fetchJSONData = useCallback(async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }, []);

  const getPokemonData = useCallback(async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const { id, name, height, weight, types, species, abilities } = data;
    // console.log("data", data);
    const getTypes = await types.map((data) => data.type.name);
    const getAbilities = await abilities.map((data) => data.ability.name);
    // console.log("id", id, name, getTypes);
    return {
      id,
      name,
      getTypes,
      getAbilities,
      height,
      weight,
      species: species.name,
      imgUrl: data.sprites.other["official-artwork"]["front_default"],
    };
  }, []);

  useEffect(() => {
    const getPokemons = async (url) => {
      if (!pokemonCtx.loading) pokemonCtx.handleStatus("start");
      try {
        const data = await fetchJSONData(url);

        // console.log("name", data);
        pokemonCtx.addPokemons(data);

        if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
      } catch (err) {
        pokemonCtx.handleStatus("error", err.message);
      }
    };

    const fetchPokemonsInfo = async () => {
      try {
        // if (!pokemonCtx.loading) pokemonCtx.handleStatus("start");
        const pokemonsInfo = await Promise.all(
          pokemonCtx.name.results.map(async (data) => {
            const pokemonData = await getPokemonData(data.url);
            // console.log("pokemonData", pokemonData);
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.getTypes,
              imgUrl: pokemonData.imgUrl,
              abilities: pokemonData.getAbilities,
              height: pokemonData.height,
              weight: pokemonData.weight,
              species: pokemonData.species,
            };
          })
        );
        console.log("pokemonsInfo", pokemonsInfo);
        pokemonCtx.addInfos(pokemonsInfo);
        if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
      } catch (err) {
        pokemonCtx.handleStatus("error", err.message);
      }
    };
    if (pokemonCtx.isNew) {
      getPokemons(pokemonCtx.url);
    }
    if (pokemonCtx.getInfos && !pokemonCtx.loading) fetchPokemonsInfo();
  }, [fetchJSONData, pokemonCtx, getPokemonData]);

  return (
    <div className={classes["cards--container"]}>
      <div className={classes["cards--container-inner"]}>{pokemonDatas}</div>
    </div>
  );
};

export default Pokedex;
