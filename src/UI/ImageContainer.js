import { memo } from "react";

import classes from "./ImageContainer.module.css";

const ImageContainer = (props) => {
  return (
    <div
      className={classes["image--container"]}
      style={{ backgroundColor: props.color }}
    >
      {props.children}
    </div>
  );
};

export default memo(ImageContainer);
