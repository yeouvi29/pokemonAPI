import { memo, useEffect, useState, useCallback } from "react";

import ImageContainer from "../UI/ImageContainer";
import NameContainer from "../UI/NameContainer";
import PokemonName from "./PokemonName";
import PokemonImage from "./PokemonImage";

import classes from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  const [pokemonData, setPokemonData] = useState([]);

  // const getPokemonData = useCallback(async (url) => {
  //   console.log("getPokemons");
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   const { name } = data;
  //   // const { id, name, height, weight, types, species, abilities } = data;
  //   // console.log("data", data);
  //   // const getTypes = await types.map((data) => data.type.name);
  //   // const getAbilities = await abilities.map((data) => data.ability.name);
  //   // console.log("id", id, name, getTypes);
  //   return {
  //     // id,
  //     name: name[0].toUpperCase() + name.slice(1),
  //     // getTypes,
  //     // getAbilities,
  //     // height,
  //     // weight,
  //     // species: species.name,
  //     imgUrl: data.sprites.other["official-artwork"]["front_default"],
  //   };
  // }, []);

  useEffect(() => {
    const fetchPokemonsInfo = async () => {
      // console.log("getpokemon data start");
      try {
        fetch(props.url)
          .then((res) => res.json())
          .then((data) => ({
            name: data.name[0].toUpperCase() + data.name.slice(1),
            imgUrl: data.sprites.other["official-artwork"]["front_default"],
          }))
          .then((data) => {
            return { name: data.name, imgUrl: data.imgUrl };
          })
          .then((data) => setPokemonData(data));
        // console.log("pokemonData", pokemonData);
        // return {
        // id: pokemonData.id,
        // name: pokemonData.name,
        // types: pokemonData.getTypes,
        // imgUrl: pokemonData.imgUrl,
        // abilities: pokemonData.getAbilities,
        // height: pokemonData.height,
        // weight: pokemonData.weight,
        // species: pokemonData.species,
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPokemonsInfo();
  }, [props.url]);

  return (
    <div className={classes["card--container"]}>
      <ImageContainer>
        <PokemonImage imgUrl={pokemonData.imgUrl} name={pokemonData.name} />
      </ImageContainer>
      <NameContainer>
        <PokemonName name={pokemonData.name} />
      </NameContainer>
    </div>
  );
};

export default memo(PokemonCard);
