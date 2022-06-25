import axios from "axios";

export default axios.create({
  baseURL: "http://elbaems-env.eba-knxsy2an.ap-southeast-1.elasticbeanstalk.com/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});