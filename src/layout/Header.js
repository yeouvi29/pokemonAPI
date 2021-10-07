import pikachu from "./../assets/pikachu_icon-icons.com_67535.png";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes["logo--container"]}>
        <h1 className={classes.logo}>Pokémon</h1>
        <img className={classes.pikachu} src={pikachu} alt="pikachu" />
      </div>
      <nav>
        <ul>{/* <li>Menu</li> */}</ul>
      </nav>
    </div>
  );
};

export default Header;
