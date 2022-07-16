import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "../styles/Home.module.css";
function pageLoading() {
  return (
    <div className={styles.bg}>
      <CircularProgress color="inherit" className={styles.bgloading} />
    </div>
  );
}

export default pageLoading;
