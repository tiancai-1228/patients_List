import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "../hook/useAppRedux";
import {
  getdate,
  getOrderList,
  postCreatOrder,
  postUpdateOrder,
  loadingState,
} from "../redux/slices/homeSlice";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  AppBar,
  Dialog,
  Button,
  ListItem,
  TextField,
  Box,
} from "@mui/material";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { listData, orderData } = useAppSelector((state) => state.home.value);
  const { isLoading } = useAppSelector((state) => state.home);
  const [isDialog, setIsDialog] = useState(false);
  const [userListData, setUserListData] = useState<any>([]);
  const [DialogListData, setDialogListData] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    orderId: "",
    userIndex: 0,
  });
  const [currentDialog, setCurrentDialog] = useState({
    id: "",
    message: "",
  });
  const [messageCheck, setMessageCheck] = useState(false);
  const [editCheck, setEditCheck] = useState(false);
  const messageData = useRef("");
  const editData = useRef("");

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
        setCurrentDialog({ id: "", message: "" });
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
              setCurrentUser({
                id: user.id,
                name: user.name,
                orderId: user.orderId,
                userIndex: index,
              });
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
              {currentDialog.id == order.orderId ? (
                <Box className={styles.creat}>
                  <TextField
                    error={editCheck}
                    variant="standard"
                    label={editCheck && "醫囑不可為空"}
                    defaultValue={currentDialog.message}
                    onChange={(val) => {
                      editData.current = val.target.value;
                    }}
                    className={styles.messageInput}
                  />
                  <div className={styles.messageBtn}>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => {
                        setCurrentDialog({ id: "", message: "" });
                        editData.current = "";
                        setEditCheck(false);
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => {
                        handelEditDialog();
                      }}
                    >
                      確定
                    </Button>
                  </div>
                </Box>
              ) : (
                <>
                  <ListItemText primary={`${order.message}`} />
                  <Button
                    autoFocus
                    color="inherit"
                    onClick={() => {
                      setCurrentDialog({
                        id: order.orderId,
                        message: order.message,
                      });
                      editData.current = order.message;
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
    setMessageCheck(false);
    setEditCheck(false);
    setIsAdd(false);
    setCurrentDialog({ id: "", message: "" });
    editData.current = "";
    messageData.current = "";
  };

  const handelCreateOrder = () => {
    if (messageData.current) {
      dispatch(
        postCreatOrder({
          user: currentUser,
          message: messageData.current,
        })
      );
    } else {
      setMessageCheck(true);
    }
  };

  const handelEditDialog = () => {
    if (editData.current) {
      if (editData.current == currentDialog.message) {
        setCurrentDialog({ id: "", message: "" });
        return;
      } else {
        dispatch(
          postUpdateOrder({
            orderId: currentDialog.id,
            message: editData.current,
            orders: userListData[currentUser.userIndex].orderId,
          })
        );
      }
    } else {
      setEditCheck(true);
    }
  };

  return (
    <div className={styles.app}>
      {isLoading && (
        <div className={styles.bg}>
          <CircularProgress color="inherit" className={styles.bgloading} />
        </div>
      )}
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
          <Box className={styles.creat}>
            <TextField
              error={messageCheck}
              label={messageCheck ? "醫囑不可為空" : "請輸入醫囑"}
              variant="standard"
              onChange={(val) => {
                messageData.current = val.target.value;
              }}
              className={styles.messageInput}
            />
            <div className={styles.messageBtn}>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  setMessageCheck(false);
                  setIsAdd(false);
                  messageData.current = "";
                }}
              >
                取消
              </Button>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  handelCreateOrder();
                }}
              >
                確定
              </Button>
            </div>
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
