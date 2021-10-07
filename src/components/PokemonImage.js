import { Fragment } from "react";

import classes from "./PokemonImage.module.css";
const PokemonImage = (props) => {
  return (
    <Fragment>
      <img
        className={classes["pokemon--image"]}
        src={props.imgUrl}
        alt={props.name}
      />
    </Fragment>
  );
};

export default PokemonImage;
