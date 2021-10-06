import randomColor from "randomcolor";

import classes from "./ImageContainer.module.css";

const ImageContainer = (props) => {
  const color = randomColor();

  return (
    <div
      className={classes["image--container"]}
      style={{ backgroundColor: color }}
    >
      {props.children}
    </div>
  );
};

export default ImageContainer;
