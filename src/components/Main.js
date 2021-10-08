import { useState, useEffect, useCallback } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [names, setNames] = useState([]);

  console.log("main is rendering");

  const prevClickHandler = useCallback(() => {
    console.log("prev clicked");
    setIsFetching(true);
    setUrl(prev);
  }, [prev]);

  const nextClickHandler = useCallback(() => {
    console.log("next clicked");
    setIsFetching(true);
    setUrl(next);
  }, [next]);

  useEffect(() => {
    const getPokemons = async (url) => {
      console.log("getName start");
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setNames(data.results);
            setPrev(data.previous);
            setNext(data.next);
            setIsFetching(false);
          });
      } catch (err) {
        setIsFetching(false);
        console.log(err.message);
      }
    };

    if (isFetching) getPokemons(url);
  }, [isFetching, url]);

  return (
    <div className={classes.main}>
      <Button
        className={classes["button-left"]}
        name="prev"
        onClick={prevClickHandler}
      >
        {prev && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
          ></i>
        )}
      </Button>

      <Pokedex names={names} />

      <Button
        className={classes["button-right"]}
        name="next"
        onClick={nextClickHandler}
      >
        {next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default Main;
