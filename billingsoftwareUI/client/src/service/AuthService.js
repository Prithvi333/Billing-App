import axios from "axios";

export const login = async (data) => {
  console.log(data);
  return await axios.post("http://localhost:8080/api/v1.0/login", data);
};
