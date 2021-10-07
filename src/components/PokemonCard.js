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
        <PokemonImage imgUrl={props.imgUrl} name={props.name} />
      </ImageContainer>
      <NameContainer>
        <PokemonName name={props.name} />
      </NameContainer>
    </div>
  );
};

export default memo(PokemonCard);
