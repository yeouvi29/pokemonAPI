import ImageContainer from "../UI/ImageContainer";
import NameContainer from "../UI/NameContainer";

import classes from "./CardContainer.module.css";

const CardContainer = () => {
  return (
    <div className={classes["card--container"]}>
      <ImageContainer></ImageContainer>
      <NameContainer></NameContainer>
    </div>
  );
};

export default CardContainer;
