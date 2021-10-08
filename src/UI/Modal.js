import { Fragment } from "react";

import classes from "./Modal.module.css";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes["btn-position"]}>
        <button className={classes["close--btn"]} onClick={props.onClose}>
          <div className={`${classes.close} ${classes["close-left"]}`}></div>
          <div className={`${classes.close} ${classes["close-right"]}`}></div>
        </button>
      </div>
      <div className={classes.conten}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
