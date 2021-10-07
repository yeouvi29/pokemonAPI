import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.buttons}  ${props.className}`}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
};
export default Button;
