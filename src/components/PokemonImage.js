import { Fragment } from "react";

import classes from "./PokemonImage.module.css";

const PokemonImage = (props) => {
  return (
    <Fragment>
      {props.imgUrl ? (
        <img
          className={classes["pokemon--image"]}
          src={props.imgUrl}
          alt={props.name}
        />
      ) : (
        <i className={`fas fa-question ${classes.question}`}></i>
      )}
    </Fragment>
  );
};

export default PokemonImage;
