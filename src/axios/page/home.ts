import { customAxios } from "../index";

interface homeProp {
  orderId: string;
}

const getUserList = () =>
  customAxios.get(`https://robbt-list.herokuapp.com/userlist`, {});

const getOrder = ({ orderId }: homeProp) =>
  customAxios.get(`https://robbt-list.herokuapp.com/orders`, {
    params: { orderId },
  });

export { getUserList, getOrder };
