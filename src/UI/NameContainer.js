import classes from "./NameContainer.module.css";

const NameContainer = (props) => {
  return <div className={classes["name--container"]}>{props.children}</div>;
};
export default NameContainer;
