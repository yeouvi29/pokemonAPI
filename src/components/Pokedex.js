import { useEffect, useContext, Fragment, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import PokemonContext from "../store/pokemon-context";
const Pokedex = (props) => {
  const pokemonCtx = useContext(PokemonContext);

  const pokemonDatas = props.data.map((data, i) => (
    <PokemonCard key={i} name={data.name} imgUrl={data.img} />
  ));

  // const fetchData = useCallback(async (url) => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
  // }, []);
  // const fetchIdAndTypes = async (url) => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   const { id, name, types } = data;
  //   // console.log("data", data);
  //   const getTypes = await types.map((data) => data.type.name);
  //   // console.log("id", id, name, getTypes);
  //   return {
  //     id,
  //     name,
  //     getTypes,
  //     imgUrl: data.sprites.other["official-artwork"]["front_default"],
  //   };
  // };

  // useEffect(() => {
  //   const fetchId = async () => {
  //     const newData = await Promise.all(
  //       pokemonCtx.name.results.map(async (data) => {
  //         const getData = await fetchIdAndTypes(data.url);
  //         console.log("getData", getData);
  //         return {
  //           id: getData.id,
  //           name: getData.name,
  //           type: getData.getTypes,
  //           img: getData.imgUrl,
  //         };
  //       })
  //     );
  //     console.log("newData", newData);
  //     pokemonCtx.addInfos(newData);
  //   };

  //   // fetchId();

  //   const getNames = async () => {
  //     if (!pokemonCtx.loading) pokemonCtx.handleStatus("start");
  //     try {
  //       const data = await fetchData(
  //         "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  //       );

  //       console.log("name", data);
  //       pokemonCtx.addName(data);

  //       if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
  //     } catch (err) {
  //       pokemonCtx.handleStatus("error", err.message);
  //     }
  //   };

  //   // console.log("length", pokemonCtx.name.length);
  //   if (pokemonCtx.isNew) {
  //     getNames();
  //   }
  //   if (pokemonCtx.getInfos && !pokemonCtx.loading) fetchId();
  // }, [fetchData, pokemonCtx]);

  return <Fragment>{pokemonDatas}</Fragment>;
};

export default Pokedex;
