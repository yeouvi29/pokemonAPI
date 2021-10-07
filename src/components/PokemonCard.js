import { memo, useContext } from "react";
import ImageContainer from "../UI/ImageContainer";
import NameContainer from "../UI/NameContainer";
import PokemonName from "./PokemonName";
import PokemonImage from "./PokemonImage";
import PokemonContext from "../store/pokemon-context";
import classes from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  const pokemonCtx = useContext(PokemonContext);
  console.log("loading", pokemonCtx.loading);
  return (
    <div className={classes["card--container"]}>
      <ImageContainer>
        {pokemonCtx.loading ? (
          <i class="fas fa-spinner"></i>
        ) : (
          <PokemonImage imgUrl={props.imgUrl} name={props.name} />
        )}
      </ImageContainer>
      <NameContainer>
        <PokemonName name={props.name} />
      </NameContainer>
    </div>
  );
};

export default memo(PokemonCard);
