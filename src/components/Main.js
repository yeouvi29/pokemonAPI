import { useState, useEffect } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  const [names, setNames] = useState({
    isFetching: true,
    url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    next: "",
    prev: "",
    results: [],
  });

  console.log("main is rendering", names);

  const prevClickHandler = () => {
    console.log("prev clicked");
    setNames((prevState) => ({
      isFetching: true,
      url: prevState.prev,
      next: "",
      prev: "",
      results: [],
    }));
  };

  const nextClickHandler = () => {
    console.log("next clicked");

    setNames((prevState) => ({
      isFetching: true,
      url: prevState.next,
      next: "",
      prev: "",
      results: [],
    }));
  };

  useEffect(() => {
    const getPokemons = async (url) => {
      console.log("getName start");
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setNames({
              isFetching: false,
              url: "",
              next: data.next,
              prev: data.previous,
              results: data.results,
            });
          });
      } catch (err) {
        setNames((prevState) => ({
          isFetching: false,
          url: "",
          next: prevState.next,
          prev: prevState.prev,
          results: prevState.results,
        }));
        console.log(err.message);
      }
    };

    if (names.isFetching) getPokemons(names.url);
  }, [names.isFetching, names.url]);

  return (
    <div className={classes.main}>
      <Button
        className={classes["button-left"]}
        name="prev"
        onClick={prevClickHandler}
      >
        {names.prev && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
          ></i>
        )}
      </Button>

      <Pokedex names={names.results} />

      <Button
        className={classes["button-right"]}
        name="next"
        onClick={nextClickHandler}
      >
        {names.next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default Main;
