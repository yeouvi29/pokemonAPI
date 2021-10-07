import { useCallback, useContext, useEffect, useState } from "react";
import Pokedex from "../components/Pokedex";
import PokemonContext from "../store/pokemon-context";
import classes from "./Main.module.css";

const Main = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const pokemonCtx = useContext(PokemonContext);

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

  const prevClickHandler = () => {
    pokemonCtx.handleClick();
    setUrl(pokemonCtx.name.previous);
  };

  const nextClickHandler = () => {
    pokemonCtx.handleClick();
    setUrl(pokemonCtx.name.next);
  };

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
        const newData = await Promise.all(
          pokemonCtx.name.results.map(async (data) => {
            const pokemonData = await getPokemonData(data.url);
            // console.log("pokemonData", pokemonData);
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              type: pokemonData.getTypes,
              img: pokemonData.imgUrl,
              abilities: pokemonData.getAbilities,
              height: pokemonData.height,
              weight: pokemonData.weight,
              species: pokemonData.species,
            };
          })
        );
        console.log("newData", newData);
        pokemonCtx.addInfos(newData);
        if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
      } catch (err) {
        pokemonCtx.handleStatus("error", err.message);
      }
    };
    if (pokemonCtx.isNew) {
      getPokemons(url);
    }
    if (pokemonCtx.getInfos && !pokemonCtx.loading) fetchPokemonsInfo();
  }, [fetchJSONData, pokemonCtx, url, getPokemonData]);

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
