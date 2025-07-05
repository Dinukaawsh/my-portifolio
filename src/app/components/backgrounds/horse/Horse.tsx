import React from "react";
import styles from "../../../styles/Horse.module.css";

const Horse: React.FC = () => (
  <div className={styles["content-horse"]}>
    <div className={styles["horse-wrap"]}>
      <div className={styles["horse-toy"]}></div>
    </div>
  </div>
);

export default Horse;
