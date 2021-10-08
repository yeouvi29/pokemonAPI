import { useCallback, useContext, useEffect, useState } from "react";

import PokemonCard from "./PokemonCard";
import PokemonContext from "../store/pokemon-context";
import classes from "./Pokedex.module.css";

const Pokedex = (props) => {
  const [names, setNames] = useState({});
  pokemonData: [],
  // const [isNew, setIsNew] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [getNewData, setGetNewData] = useState(false);
  const pokemonCtx = useContext(PokemonContext);

  const pokemonDatas = pokemonCtx.pokemonData.map((data, i) => (
    <PokemonCard
      key={i}
      name={data.name}
      imgUrl={data.imgUrl}
      // isLoading={props.isLoading}
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
      props.handleLoading(true);

      try {
        fetchJSONData(url)
          .then((data) => pokemonCtx.addPokemons(data))
          .then(() => {
            props.handleLoading(false);
            props.handleIsNew(false);
            props.handleGetData(true);
          });
      } catch (err) {
        props.handleLoading(false);
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

        pokemonCtx.addInfos(pokemonsInfo);
        props.handleGetData(false);

        console.log("pokemonsInfo", pokemonsInfo);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (props.isNew) {
      getPokemons(pokemonCtx.url);
    }
    if (props.getNewData) fetchPokemonsInfo();
  }, [fetchJSONData, pokemonCtx, getPokemonData, props]);

  return (
    <div className={classes["cards--container"]}>
      <div className={classes["cards--container-inner"]}>{pokemonDatas}</div>
    </div>
  );
};

export default Pokedex;
