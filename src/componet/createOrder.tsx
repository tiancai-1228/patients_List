/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Button, TextField, Box } from "@mui/material";
import { useAppDispatch } from "../hook/useAppRedux";
import { postCreatOrder } from "../redux/slices/homeSlice";

interface createOrderProp {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    id: string;
    orderId: string;
  };
}

function createOrder({ setIsAdd, userData }: createOrderProp) {
  const dispatch = useAppDispatch();
  const [messageCheck, setMessageCheck] = useState(false);
  const messageData = useRef("");

  useEffect(() => {
    return () => {
      messageData.current = "";
      setMessageCheck(false);
    };
  }, []);

  const handelCreateOrder = () => {
    if (messageData.current) {
      dispatch(
        postCreatOrder({
          user: userData,
          message: messageData.current,
        })
      );
    } else {
      setMessageCheck(true);
    }
  };

  return (
    <>
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
    </>
  );
}

export default createOrder;
