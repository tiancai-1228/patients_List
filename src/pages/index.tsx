import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "../hook/useAppRedux";
import { getdate } from "../redux/slices/homeSlice";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { listData } = useAppSelector((state) => state.home.value);

  useEffect(() => {
    dispatch(getdate());
  }, []);

  const patientsList = () => {
    if (listData) {
      return listData.map(
        (user: { id: string; name: string; orderId: string }) => (
          <ListItemButton key={user.id}>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={`order count : ${user.orderId.split(",").length}`}
            />
          </ListItemButton>
        )
      );
    }
  };

  return (
    <div className={styles.app}>
      {listData ? (
        <div className={styles.list}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={
              <ListSubheader>
                <h1 className={styles.title}>PATIENTS LIST</h1>
              </ListSubheader>
            }
          >
            {patientsList()}
          </List>
        </div>
      ) : (
        <CircularProgress color="inherit" className={styles.loading} />
      )}
    </div>
  );
};

export default Home;
