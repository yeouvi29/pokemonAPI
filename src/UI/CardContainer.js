import ImageContainer from "./ImageContainer";
import NameContainer from "./NameContainer";

import classes from "./CardContainer.module.css";

const CardContainer = () => {
  return (
    <div className={classes["card--container"]}>
      <ImageContainer />
      <NameContainer />
    </div>
  );
};

export default CardContainer;
