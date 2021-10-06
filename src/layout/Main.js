import CardContainer from "../components/CardContainer";
import classes from "./Main.module.css";

const Main = (props) => {
  const cards = new Array(20)
    .fill("")
    .map((card, i) => <CardContainer key={i} />);
  return (
    <div className={classes.main}>
      <button className={classes.buttons}>prev</button>
      <div className={classes["cards--container"]}>{cards}</div>
      <button className={classes.buttons}>next</button>
    </div>
  );
};

export default Main;
