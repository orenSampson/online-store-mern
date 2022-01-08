import ClipLoader from "react-spinners/ClipLoader";

import styles from "./ClipLoaderComponent.module.scss";

const ClipLoaderComponent = (props) => {
  return (
    <div className={styles.ClipLoaderComponent}>
      <ClipLoader loading={props.isLoading} size={150} />
    </div>
  );
};

export default ClipLoaderComponent;
