import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "../hook/useAppRedux";
import { getdate } from "../redux/slices/homeSlice";
const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          dispatch(getdate({}));
        }}
      >
        123456
      </button>
    </div>
  );
};

export default Home;
