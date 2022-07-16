/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Button, TextField, Box } from "@mui/material";
import { useAppDispatch } from "../hook/useAppRedux";
import { postUpdateOrder } from "../redux/slices/homeSlice";

interface editOrderProp {
  setCurrentOrder: React.Dispatch<
    React.SetStateAction<{
      id: string;
      message: string;
    }>
  >;
  currentOrder: {
    id: string;
    message: string;
  };
  orders: string;
  initMessage: string;
}

function editOrder({
  currentOrder,
  orders,
  setCurrentOrder,
  initMessage,
}: editOrderProp) {
  const dispatch = useAppDispatch();
  const [editCheck, setEditCheck] = useState(false);

  const editData = useRef(initMessage);

  useEffect(() => {
    return () => {
      editData.current = initMessage;
      setEditCheck(false);
    };
  }, []);

  const handelEditOrder = () => {
    if (editData.current) {
      if (editData.current == currentOrder.message) {
        setCurrentOrder({ id: "", message: "" });
        return;
      } else {
        dispatch(
          postUpdateOrder({
            orderId: currentOrder.id,
            message: editData.current,
            orders,
          })
        );
      }
    } else {
      setEditCheck(true);
    }
  };

  return (
    <Box className={styles.creat}>
      <TextField
        error={editCheck}
        variant="standard"
        label={editCheck && "醫囑不可為空"}
        defaultValue={currentOrder.message}
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
            setCurrentOrder({ id: "", message: "" });
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
            handelEditOrder();
          }}
        >
          確定
        </Button>
      </div>
    </Box>
  );
}

export default editOrder;
