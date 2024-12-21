import axios from "axios";
import { BACKEND_URL } from "../../../constants";


export const fetchMenusService = async () => {
  const response = await axios.get(`${BACKEND_URL}/menus/upcoming-menus`,{
    withCredentials:true
  });
  return response.data;
};

export const fetchMenuById = async(menuId)=>{
  const response = await axios.get(`${BACKEND_URL}/menus/${menuId}`,{
    withCredentials:true
  });
  return response.data;
}

export const fetchBatches = async() =>{
  const response = await axios.get(`${BACKEND_URL}/batches`,{
    withCredentials:true
  });
  return response.data;
}


export const fetchUsersByUsername = async(pattern) =>{
  const response = await axios.get(`${BACKEND_URL}/auth/search/${pattern}`,{
    withCredentials:true
  })
  return response.data;
}

function transformToOrderDTO(input) {
  const orderDTO = {
      orderItems: [],
      orderAmount: 0,
  };

  const groupedByReceiver = input.reduce((acc, curr) => {
      const receiverId = curr.receiver.id;
      const amount = curr.foodItem.price * parseInt(curr.quantity, 10);

      if (!acc[receiverId]) {
          acc[receiverId] = {
              receiverId,
              amount: 0,
              orderedFoodItems: []
          };
      }

      acc[receiverId].amount += amount;
      acc[receiverId].orderedFoodItems.push({
          menuId: parseInt(curr.menuId, 10),
          foodItemId: curr.foodItem.id,
          quantity: parseInt(curr.quantity, 10),
          batchId: curr.batchId
      });

      return acc;
  }, {});

  for (const receiverId in groupedByReceiver) {
      const orderItem = groupedByReceiver[receiverId];
      orderDTO.orderItems.push(orderItem);
      orderDTO.orderAmount += orderItem.amount;
  }

  return orderDTO;
}

export const orderItems = async(orderItems)=>{
  const order = transformToOrderDTO(orderItems);

  const response = await axios.post(`${BACKEND_URL}/orders`,order,{
    withCredentials:true
  })
  return response.data;
}