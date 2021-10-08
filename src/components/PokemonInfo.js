import Modal from "../UI/Modal";
import classes from "./PokemonInfo.module.css";

const PokemonInfo = (props) => {
  const { name, id, species, abilities, height, weight, imgUrl } =
    props.pokemonData;
  let spreadAbilities = "";

  if (abilities) abilities.forEach((ability) => (spreadAbilities += ability));
  return (
    <Modal show={props.showPokemonInfo} onClose={props.onClose}>
      <div>
        <div>
          <img src={imgUrl} alt={name} />
        </div>
        <div className={classes["info--text"]}>
          <ul>
            <li>{name}</li>
            <li>{id}</li>
            <li>{species ? species : ""}</li>
            <li>{spreadAbilities ? spreadAbilities : "Unknown"}</li>
            <li>{height}</li>
            <li>{weight}</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonInfo;
