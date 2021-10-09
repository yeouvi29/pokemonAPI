import classes from "./NameContainer.module.css";

const NameContainer = (props) => {
  return (
    <div className={classes["name--container"]}>
      <div className={classes["name"]}>{props.children}</div>
    </div>
  );
};
export default NameContainer;
