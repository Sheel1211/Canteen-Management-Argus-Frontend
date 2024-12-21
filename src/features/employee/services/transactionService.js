import axios from "axios";
import { BACKEND_URL } from "../../../constants";

export const fetchTransactionsOfUser = async()=>{
    const response = await axios.get(`${BACKEND_URL}/transactions/user`,
      {
        withCredentials:true
      }
    );
    return response.data;
  }