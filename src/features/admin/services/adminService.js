import axios from "axios";
import { BACKEND_URL } from "../../../constants";

export const postCanteen = async (canteenData) => {
 
    const response = await axios.post(`${BACKEND_URL}/canteens`, canteenData,{
        withCredentials:true
      })
      return response.data;
};


export const fetchAllCanteens = async () => {
    const response = await axios.get(`${BACKEND_URL}/canteens`,{
      withCredentials:true
    });
    return response.data;
};