import { useState, useEffect } from "react";
import pokemon from "pokemon";
import classes from "./BlindQuiz.module.css";
const pokemonAll = pokemon.all();
const pokemonLength = pokemonAll.length;
const BlindQuiz = (props) => {
  const [pokemonData, setPokemonData] = useState({ isFetching: false });
  const [btnText, setBtnText] = useState("Get Answer!");
  const clickHandler = async () => {
    if (btnText === "Get Answer!") {
      setBtnText("Next");
    } else if (btnText === "Next") {
      setPokemonData((prev) => ({
        isFetching: true,
        name: prev.name,
        imgUrl: prev.imgUrl,
      }));
      const { props } = await getServerSideProps();
      const { name, imgUrl } = props;
      setPokemonData({ isFetching: false, name, imgUrl });
      setBtnText("Get Answer!");
    }
  };

  useEffect(() => {
    const getprops = async () => {
      const { props } = await getServerSideProps();
      const { name, imgUrl } = props;
      setPokemonData({ isFetching: false, name, imgUrl });
    };
    getprops();
  }, []);

  return (
    <div className={classes.scroll}>
      <div className={classes["quiz-container"]}>
        <div className={classes["image-container"]}>
          <div className={classes.image}>
            {pokemonData.isFetching ? (
              <i className={`fas fa-spinner ${classes.loading}`}></i>
            ) : (
              <img
                className={`${classes.img} ${
                  btnText === "Next" && classes.reveal
                }`}
                src={pokemonData.imgUrl}
                alt={pokemonData.name}
              />
            )}
          </div>
          {btnText === "Get Answer!" ||
          (btnText === "Next" && pokemonData.isFetching) ? (
            <p>Who's that pokemon?</p>
          ) : (
            <p>
              It's{" "}
              <span>
                {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
              </span>
              !
            </p>
          )}
        </div>

        <button className={classes.btn} onClick={clickHandler}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const randomPokemon =
    pokemonAll[Math.trunc(Math.random() * pokemonLength)].toLowerCase();

  const fetchData = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemon}/`
    );
    const data = await res.json();
    return data.sprites.other["official-artwork"]["front_default"];
  };
  let imgUrl = await fetchData();
  while (!imgUrl) {
    imgUrl = await fetchData();
  }

  // const imgUrl = data.sprites.other["official-artwork"]["front_default"];

  return {
    props: {
      name: randomPokemon,
      imgUrl,
    },
  };
}

export default BlindQuiz;
