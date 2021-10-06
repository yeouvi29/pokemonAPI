import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h1 className={classes.logo}>Pokemon</h1>
      <nav>
        <ul>
          <li>Menu</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
