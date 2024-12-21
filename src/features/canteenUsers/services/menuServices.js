import axios from "axios";
import { BACKEND_URL } from "../../../constants";


export const fetchCategories = async () => {
  const response = await axios.get(`${BACKEND_URL}/categories`,{
    withCredentials:true
  });
  return response.data;
};

export const postFoodItem = async (foodItemData) => {
    const response = await axios.post(`${BACKEND_URL}/food-items`, foodItemData,{
        withCredentials:true
      })
      return response.data;
};

export const fetchFoodItemsByCanteenId = async(canteenId) => {
  const response = await axios.get(`${BACKEND_URL}/food-items/canteen/${canteenId}`,{
    withCredentials:true
  });
  return response.data;
}

export const fetchFoodItemsByCanteenIdAndCategory = async(foodItemRequestData) => {
  const response = await axios.post(`${BACKEND_URL}/food-items/category`,foodItemRequestData,{
    withCredentials:true
  });
  return response.data;
}
  
export const postMenu= async(menuPostingData)=>{
  const response=await axios.post(`${BACKEND_URL}/menus`, menuPostingData,{
        withCredentials:true
      })
      return response.data;
}

export const fetchMenuForMonth= async(menuFetchReqData)=>{

  const response=await axios.post(`${BACKEND_URL}/menus/menu-of-Canteen`,menuFetchReqData,{
    withCredentials:true
  })
  return response.data;
}
