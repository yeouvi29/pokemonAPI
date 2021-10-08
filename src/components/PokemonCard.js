import { memo, useEffect, useState, useCallback, Fragment } from "react";

import ImageContainer from "../UI/ImageContainer";
import NameContainer from "../UI/NameContainer";
import PokemonName from "./PokemonName";
import PokemonImage from "./PokemonImage";

import classes from "./PokemonCard.module.css";
import PokemonInfo from "./PokemonInfo";

const PokemonCard = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [showPokemonInfo, setShowPokemonInfo] = useState(false);

  const showPokemonInfoHandler = () => {
    setShowPokemonInfo(true);
  };
  const hidePokemonInfoHandler = () => {
    setShowPokemonInfo(false);
  };

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        fetch(props.url)
          .then((res) => res.json())
          .then((data) => {
            const types = data.types.map((data) =>
              data.type.name.toLowerCase()
            );
            return {
              name: data.name[0].toUpperCase() + data.name.slice(1),
              imgUrl: data.sprites.other["official-artwork"]["front_default"],
              id: data.id,
              types,
              height: data.height,
              weight: data.weight,
              species: data.species.name,
            };
          })
          .then((data) => {
            return {
              name: data.name,
              imgUrl: data.imgUrl,
              id: data.id,
              types: data.types,
              height: data.height,
              weight: data.weight,
              species: data.species,
            };
          })
          .then((data) => setPokemonData(data));
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPokemonInfo();
  }, [props.url]);

  return (
    <Fragment>
      {showPokemonInfo && (
        <PokemonInfo
          onClose={hidePokemonInfoHandler}
          pokemonData={pokemonData}
          showPokemonInfo={showPokemonInfo}
        />
      )}
      <div
        className={classes["card--container"]}
        onClick={showPokemonInfoHandler}
      >
        <ImageContainer>
          <PokemonImage imgUrl={pokemonData.imgUrl} name={pokemonData.name} />
        </ImageContainer>
        <NameContainer>
          <PokemonName name={pokemonData.name} />
        </NameContainer>
      </div>
    </Fragment>
  );
};

export default memo(PokemonCard);
