import axios from "axios";

export const fetchDashboardData = async () => {
  return axios.get("http://localhost:8080/api/v1.0/dashboard", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
