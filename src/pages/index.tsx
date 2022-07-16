import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "../hook/useAppRedux";
import { getdate, getOrderList, loadingState } from "../redux/slices/homeSlice";

import CreateOrder from "../componet/createOrder";
import EditOrder from "../componet/editOrder";
import PageLoading from "../componet/pageLoading";

import {
  AppBar,
  Dialog,
  Button,
  ListItem,
  DialogContent,
  CircularProgress,
  Typography,
  IconButton,
  Toolbar,
  Divider,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  ListSubheader,
  List,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { listData, orderData } = useAppSelector((state) => state.home.value);
  const { isLoading } = useAppSelector((state) => state.home);
  const [isDialog, setIsDialog] = useState(false);
  const [userListData, setUserListData] = useState<any>([]);
  const [DialogListData, setDialogListData] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    message: "",
  });

  useEffect(() => {
    dispatch(getdate());
  }, []);

  useEffect(() => {
    if (listData) {
      setUserListData(listData);
    }
  }, [listData]);

  useEffect(() => {
    if (orderData) {
      setDialogListData(orderData);
      setIsDialog(true);
    }
    if (isLoading) {
      dispatch(loadingState({ lodaingState: false }));
      if (isAdd) {
        setIsAdd(false);
      } else {
        setCurrentOrder({ id: "", message: "" });
      }
    }
  }, [orderData]);

  const patientsList = () => {
    if (userListData) {
      return userListData.map(
        (
          user: { id: string; name: string; orderId: string },
          index: number
        ) => (
          <ListItemButton
            key={user.id}
            onClick={() => {
              dispatch(getOrderList({ orderId: user.orderId }));
              setCurrentUser(index);
            }}
          >
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

  const dialogList = () => {
    if (DialogListData.length > 0) {
      return DialogListData.map(
        (order: { orderId: string; message: string }) => (
          <List key={order.orderId}>
            <ListItem>
              {currentOrder.id == order.orderId ? (
                <EditOrder
                  setCurrentOrder={setCurrentOrder}
                  currentOrder={currentOrder}
                  orders={userListData[currentUser].orderId}
                  initMessage={order.message}
                />
              ) : (
                <>
                  <ListItemText primary={`${order.message}`} />
                  <Button
                    autoFocus
                    color="inherit"
                    onClick={() => {
                      setCurrentOrder({
                        id: order.orderId,
                        message: order.message,
                      });
                    }}
                  >
                    編輯
                  </Button>
                </>
              )}
            </ListItem>
            <Divider />
          </List>
        )
      );
    }
  };

  const handelCloseDialog = () => {
    setIsDialog(false);
    setIsAdd(false);
    setCurrentOrder({ id: "", message: "" });
  };

  return (
    <div className={styles.app}>
      {isLoading && <PageLoading />}
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
        <div className={styles.loading}>
          <CircularProgress color="inherit" />
          <h1>heroku server is sleeping please wait {`><`} </h1>
        </div>
      )}

      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={isDialog}
        onClose={() => {
          handelCloseDialog();
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                handelCloseDialog();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              DIALOG
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setIsAdd(true);
              }}
            >
              新增
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={true}>
          {DialogListData && dialogList()}
        </DialogContent>
        {isAdd && (
          <CreateOrder
            setIsAdd={setIsAdd}
            userData={userListData[currentUser]}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Home;
