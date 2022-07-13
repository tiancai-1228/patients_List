import { customAxios } from "../index";

const getUserList = () =>
  customAxios.get(`https://robbt-list.herokuapp.com/userlist`, {});

export { getUserList };
