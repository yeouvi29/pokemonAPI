import { memo } from "react";

import ImageContainer from "../UI/ImageContainer";
import NameContainer from "../UI/NameContainer";
import PokemonName from "./PokemonName";
import PokemonImage from "./PokemonImage";

import classes from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  return (
    <div className={classes["card--container"]}>
      <ImageContainer>
        {props.isLoading ? (
          <i class="fas fa-spinner"></i>
        ) : (
          <PokemonImage imgUrl={props.imgUrl} name={props.name} />
        )}
      </ImageContainer>
      <NameContainer id={props.id}>
        <PokemonName name={props.name} />
      </NameContainer>
    </div>
  );
};

export default memo(PokemonCard);
