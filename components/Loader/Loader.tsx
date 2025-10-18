import React from "react";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loader}></div>
      <p className={css.text}>Loading...</p>
    </div>
  );
};

export default Loader;
