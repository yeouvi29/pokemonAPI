import { Fragment } from "react";

import classes from "./PokemonName.module.css";

const PokemonName = (props) => {
  const fontSize = props.name && props.name.length > 10 ? ".8rem" : "1rem";
  return (
    <Fragment>
      <h3 className={classes["pokemon--name"]} style={{ fontSize }}>
        {props.name}
      </h3>
    </Fragment>
  );
};

export default PokemonName;
