import { useState, useEffect, useCallback } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  const [status, setStatus] = useState("GET_NEW_NAMES");
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [names, setNames] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);

  console.log("main is rendering");

  const fetchJSONData = useCallback(async (url) => {
    console.log("fetching Data");
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }, []);

  const getPokemonData = useCallback(async (url) => {
    console.log("getPokemons");
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

  const prevClickHandler = useCallback(() => {
    console.log("prev clicked");
    setStatus("GET_NEW_NAMES");
    setUrl(prev);
  }, [prev]);

  const nextClickHandler = useCallback(() => {
    console.log("next clicked");
    setStatus("GET_NEW_NAMES");
    setUrl(next);
  }, [next]);

  useEffect(() => {
    const getPokemons = async (url) => {
      console.log("getName start");
      try {
        fetchJSONData(url)
          .then((data) => {
            setNames(data.results);
            setPrev(data.previous);
            setNext(data.next);
          })
          .then(() => {
            setStatus("GET_NEW_POKEMONS_INFO");
          });
      } catch (err) {
        setStatus("ERROR");
        console.log(err.message);
      }
    };

    const fetchPokemonsInfo = async () => {
      // console.log("getpokemon data start");
      try {
        setStatus("LOADING");
        setPokemonsData([]);
        const pokemonsInfo = await Promise.all(
          names.map(async (data) => {
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

        // console.log("pokemonsData", pokemonsInfo);
      } catch (err) {
        setStatus("ERROR");
        console.log(err.message);
      }
    };
    if (status === "GET_NEW_NAMES") {
      getPokemons(url);
    }
    if (status === "GET_NEW_POKEMONS_INFO") fetchPokemonsInfo();
  }, [fetchJSONData, getPokemonData, names, status, url]);

  return (
    <div className={classes.main}>
      <Button className={classes["button-left"]} onClick={prevClickHandler}>
        {/* {prev && ( */}
        <i className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}></i>
        {/* )} */}
      </Button>

      <Pokedex pokemonsData={pokemonsData} isLoading={status} />

      <Button className={classes["button-right"]} onClick={nextClickHandler}>
        {/* {next && ( */}
        <i
          className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
        ></i>
        {/* )} */}
      </Button>
    </div>
  );
};

export default Main;
