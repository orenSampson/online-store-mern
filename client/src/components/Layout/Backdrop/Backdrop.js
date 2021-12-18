import styles from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return props.showBackDrop && <div className={styles["Backdrop"]}></div>;
};

export default Backdrop;
