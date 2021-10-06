import classes from "./Main.module.css";

const Main = (props) => {
  return <div classes={classes.main}>{props.children}</div>;
};

export default Main;
