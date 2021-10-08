import { useState, useEffect } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  const [pageData, setPageData] = useState({
    isFetching: true,
    currentUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    next: "",
    prev: "",
    pokedexData: [],
  });

  console.log("main is rendering", pageData);

  const prevClickHandler = () => {
    setPageData((prevState) => ({
      isFetching: true,
      currentUurl: prevState.prev,
      next: "",
      prev: "",
      pokedexData: [],
    }));
  };

  const nextClickHandler = () => {
    setPageData((prevState) => ({
      isFetching: true,
      currentUrl: prevState.next,
      next: "",
      prev: "",
      pokedexData: [],
    }));
  };

  useEffect(() => {
    const getPokemons = async (url) => {
      console.log("getName start");
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setPageData({
              isFetching: false,
              currentUrl: "",
              next: data.next,
              prev: data.previous,
              pokedexData: data.results,
            });
          });
      } catch (err) {
        setPageData((prevState) => ({
          isFetching: false,
          currentUrl: "",
          next: prevState.next,
          prev: prevState.prev,
          pokedexData: prevState.pokedexData,
        }));
        console.log(err.message);
      }
    };

    if (pageData.isFetching) getPokemons(pageData.currentUrl);
  }, [pageData.isFetching, pageData.currentUrl]);

  return (
    <div className={classes.main}>
      <Button
        className={classes["button-left"]}
        name="prev"
        onClick={prevClickHandler}
      >
        {pageData.prev && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
          ></i>
        )}
      </Button>

      <Pokedex pokedexData={pageData.pokedexData} />

      <Button
        className={classes["button-right"]}
        name="next"
        onClick={nextClickHandler}
      >
        {pageData.next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default Main;
