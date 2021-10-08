import { memo, useState, useEffect, useCallback } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  const [status, setStatus] = useState("GET_NEW_NAMES");
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [names, setNames] = useState({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const [pokemonsData, setPokemonsData] = useState([]);

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
    setStatus("GET_NEW_NAMES");
    setUrl(names.previous);
  };

  const nextClickHandler = () => {
    setStatus("GET_NEW_NAMES");
    setUrl(names.next);
  };

  useEffect(() => {
    const getPokemons = async (url) => {
      try {
        fetchJSONData(url)
          .then((data) => setNames(data))
          .then(() => {
            setStatus("GET_NEW_POKEMONS_INFO");
          });
      } catch (err) {
        setStatus("ERROR");
        console.log(err.message);
      }
    };

    const fetchPokemonsInfo = async () => {
      try {
        setStatus("LOADING");
        const pokemonsInfo = await Promise.all(
          names.results.map(async (data) => {
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

        setPokemonsData(pokemonsInfo);
        setStatus("COMPLETE");

        console.log("pokemonsData", pokemonsInfo);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (status === "GET_NEW_NAMES") {
      getPokemons(url);
    }
    if (status === "GET_NEW_POKEMONS_INFO") fetchPokemonsInfo();
  }, [fetchJSONData, getPokemonData, names.results, status, url]);

  return (
    <div className={classes.main}>
      <Button className={classes["button-left"]} onClick={prevClickHandler}>
        {names.previous && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
          ></i>
        )}
      </Button>

      <Pokedex pokemonsData={pokemonsData} />

      <Button className={classes["button-right"]} onClick={nextClickHandler}>
        {names.next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default memo(Main);
