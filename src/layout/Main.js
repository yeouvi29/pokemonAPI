import { useCallback, useContext, useEffect, useState } from "react";
import Pokedex from "../components/Pokedex";
import PokemonContext from "../store/pokemon-context";
import chevronLeft from "./../assets/chevron-thin-left.svg";
import chevronRight from "./../assets/chevron-thin-right.svg";
import classes from "./Main.module.css";

const Main = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const pokemonCtx = useContext(PokemonContext);
  const fetchData = useCallback(async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }, []);
  const fetchIdAndTypes = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const { id, name, types } = data;
    // console.log("data", data);
    const getTypes = await types.map((data) => data.type.name);
    // console.log("id", id, name, getTypes);
    return {
      id,
      name,
      getTypes,
      imgUrl: data.sprites.other["official-artwork"]["front_default"],
    };
  };

  const prevClickHandler = () => {
    pokemonCtx.handleClick();
    setUrl(pokemonCtx.name.previous);
  };

  const nextClickHandler = () => {
    pokemonCtx.handleClick();
    setUrl(pokemonCtx.name.next);
  };

  useEffect(() => {
    const getNames = async (url) => {
      if (!pokemonCtx.loading) pokemonCtx.handleStatus("start");
      try {
        const data = await fetchData(url);

        // console.log("name", data);
        pokemonCtx.addName(data);

        if (pokemonCtx.loading) pokemonCtx.handleStatus("success");
      } catch (err) {
        pokemonCtx.handleStatus("error", err.message);
      }
    };

    const fetchId = async () => {
      const newData = await Promise.all(
        pokemonCtx.name.results.map(async (data) => {
          const getData = await fetchIdAndTypes(data.url);
          // console.log("getData", getData);
          return {
            id: getData.id,
            name: getData.name,
            type: getData.getTypes,
            img: getData.imgUrl,
          };
        })
      );
      // console.log("newData", newData);
      pokemonCtx.addInfos(newData);
    };
    if (pokemonCtx.isNew) {
      getNames(url);
    }
    if (pokemonCtx.getInfos && !pokemonCtx.loading) fetchId();
  }, [fetchData, pokemonCtx, url]);

  return (
    <div className={classes.main}>
      {pokemonCtx.name.previous && (
        <button className={classes.buttons} onClick={prevClickHandler}>
          <img className={classes.arrow} src={chevronLeft} alt="arrow-left" />
        </button>
      )}
      <div className={classes["cards--container"]}>
        <Pokedex data={pokemonCtx.pokemonData} />
      </div>
      {pokemonCtx.name.next && (
        <button className={classes.buttons} onClick={nextClickHandler}>
          <img className={classes.arrow} src={chevronRight} alt="arrow-right" />
        </button>
      )}
    </div>
  );
};

export default Main;
