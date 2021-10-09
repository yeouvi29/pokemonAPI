import Modal from "../UI/Modal";
import bug from "./../assets/Pokemon_Type_Icon_Bug.png";
import dark from "./../assets/Pokemon_Type_Icon_Dark.png";
import dragon from "./../assets/Pokemon_Type_Icon_Dragon.png";
import electric from "./../assets/Pokemon_Type_Icon_Electric.png";
import fairy from "./../assets/Pokemon_Type_Icon_Fairy.png";
import fighting from "./../assets/Pokemon_Type_Icon_Fighting.png";
import fire from "./../assets/Pokemon_Type_Icon_Fire.png";
import flying from "./../assets/Pokemon_Type_Icon_Flying.png";
import ghost from "./../assets/Pokemon_Type_Icon_Ghost.png";
import grass from "./../assets/Pokemon_Type_Icon_Grass.png";
import ground from "./../assets/Pokemon_Type_Icon_Ground.png";
import ice from "./../assets/Pokemon_Type_Icon_Ice.png";
import normal from "./../assets/Pokemon_Type_Icon_Normal.png";
import poison from "./../assets/Pokemon_Type_Icon_Poison.png";
import psychic from "./../assets/Pokemon_Type_Icon_Psychic.png";
import rock from "./../assets/Pokemon_Type_Icon_Rock.png";
import steel from "./../assets/Pokemon_Type_Icon_Steel.png";
import water from "./../assets/Pokemon_Type_Icon_Water.png";
import classes from "./PokemonInfo.module.css";

const iconTypes = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const PokemonInfo = (props) => {
  const { name, abilities, types, height, weight, imgUrl } = props.pokemonData;
  const typeIcons = types.map((type) => {
    return <img className={classes.icon} src={iconTypes[type]} alt={type} />;
  });

  return (
    <Modal show={props.showPokemonInfo} onClose={props.onClose}>
      <div className={classes["info--container"]}>
        <div className={classes["image--container"]}>
          <img className={classes.image} src={imgUrl} alt={name} />
        </div>
        <div className={classes["text--container"]}>
          <ul className={classes["info--list"]}>
            <li>
              <span>Name</span>
              <span> {name}</span>
            </li>
            <li className={classes.types}>
              <span>Types</span>
              <span>{typeIcons}</span>
            </li>
            <li>
              <span>Abilities</span>
              <span
                style={{ fontSize: abilities.length > 15 ? ".8rem" : "1.2rem" }}
              >
                {abilities}
              </span>
            </li>
            <li>
              <span>Height</span>
              <span>{height / 10}m</span>
            </li>
            <li>
              <span>Weight</span>
              <span>{weight / 10}kg</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonInfo;
