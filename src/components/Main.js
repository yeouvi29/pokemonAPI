import { useState, useEffect } from "react";

import Button from "../UI/Button";
import Pokedex from "./Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  // state that manages fetched page data from pokeapi
  const [pageData, setPageData] = useState({
    isFetching: true,
    currentUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    next: "",
    prev: "",
    pokedexData: [],
  });

  // when "<" button is clicked, set the currentUrl to prev url that was stored in pageData.prev
  const prevClickHandler = () => {
    setPageData((prevState) => ({
      isFetching: true,
      currentUrl: prevState.prev,
      next: "",
      prev: "",
      pokedexData: [],
    }));
  };

  // when ">" button is clicked, set the currentUrl to the url that was stored in pageData.next
  const nextClickHandler = () => {
    setPageData((prevState) => ({
      isFetching: true,
      currentUrl: prevState.next,
      next: "",
      prev: "",
      pokedexData: [],
    }));
  };

  // when the state of pageData.isFetching or pageData.currentUrl is changed, fetching the new data with the url that is stored in pageData.currentUrl 
  useEffect(() => {
    const getPokemons = async (url) => {
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
        className={`${classes["button-left"]} ${classes.buttons} buttons`}
        name="prev"
      >
        {pageData.prev && (
          <i
            className={`fas fa-chevron-left arrow ${classes["arrow-left"]}`}
            onClick={prevClickHandler}
          ></i>
        )}
      </Button>

      <Pokedex pokedexData={pageData.pokedexData} />

      <Button
        className={`${classes["button-right"]} ${classes.buttons} buttons`}
        name="next"
      >
        {pageData.next && (
          <i
            className={`fas fa-chevron-right arrow ${classes["arrow-right"]}`}
            onClick={nextClickHandler}
          ></i>
        )}
      </Button>
    </div>
  );
};

export default Main;
