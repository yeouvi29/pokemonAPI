import Pokedex from "../components/Pokedex";
import classes from "./Main.module.css";

const Main = () => {
  return (
    <div className={classes.main}>
      <button className={classes.buttons}>prev</button>
      <div className={classes["cards--container"]}>
        <Pokedex />
      </div>
      <button className={classes.buttons}>next</button>
    </div>
  );
};

export default Main;
