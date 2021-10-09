import { memo } from "react";

const Button = (props) => {
  return (
    <button className={`buttons  ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default memo(Button);
