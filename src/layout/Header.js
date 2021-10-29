import { NavLink } from "react-router-dom";

import pikachu from "./../assets/pikachu_icon-icons.com_67535.png";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <NavLink to="/" className={classes["logo--container"]}>
        <h1 className={classes.logo}>Pokémon</h1>
        <img className={classes.pikachu} src={pikachu} alt="pikachu" />
      </NavLink>
      <NavLink to="/blind-quiz">
        <nav className={classes.nav}>
          <ul>
            <li>Blind Quiz</li>
          </ul>
        </nav>
      </NavLink>
    </div>
  );
};

export default Header;
