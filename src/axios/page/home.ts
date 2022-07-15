import { customAxios, API_URL } from "../index";
interface getOrderProp {
  orderId: string;
}
interface UserUpdateProp {
  orderId: string;
  userId: string;
}
interface creatOrderProp {
  message: string;
}

interface orderUpdateProp {
  orderId: string;
  message: string;
}

const getUserList = () => customAxios.get(`${API_URL}/userlist`, {});

const getOrder = ({ orderId }: getOrderProp) =>
  customAxios.post(`${API_URL}/orders`, {
    orderId,
  });

const UserUpdate = ({ orderId, userId }: UserUpdateProp) =>
  customAxios.post(`${API_URL}/userUpdate`, {
    orderId,
    userId,
  });
const creatOrder = ({ message }: creatOrderProp) =>
  customAxios.post(`${API_URL}/creatOrder`, {
    message,
  });
const orderUpdate = ({ orderId, message }: orderUpdateProp) =>
  customAxios.post(`${API_URL}/orderUpdate `, {
    orderId,
    message,
  });

export { getUserList, getOrder, UserUpdate, creatOrder, orderUpdate };
