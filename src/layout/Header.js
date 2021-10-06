import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div>Pokemon</div>
      <nav>
        <ul>
          <li>Menu</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
