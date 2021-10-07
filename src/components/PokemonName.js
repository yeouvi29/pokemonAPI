import { Fragment } from "react";

import classes from "./PokemonName.module.css";

const PokemonName = (props) => {
  return (
    <Fragment>
      <h3 className={classes["pokemon--name"]}>{props.name}</h3>
    </Fragment>
  );
};

export default PokemonName;
