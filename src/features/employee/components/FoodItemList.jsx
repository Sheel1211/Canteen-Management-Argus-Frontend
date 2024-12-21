import React from "react";
import { List, Typography, Button } from "antd";

const { Title } = Typography;

const FoodItemList = ({ menuDetails, onAddToCart }) => (
  <List
    dataSource={menuDetails.menuFoodItemList}
    renderItem={(item) => (
      <List.Item style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ margin: 0 }}>{item.foodItem.name}</Title>
          <p><b>Description:</b> {item.foodItem.description}</p>
          <p><b>Price:</b> ₹{item.foodItem.price.toFixed(2)}</p>
          <p><b>Available Quantity:</b> {item.quantity}</p>
        </div>
        <Button
          type="primary"
          onClick={() => onAddToCart(item.foodItem)}
          style={{ marginLeft: "1rem", padding: "0.5rem 1.5rem" }}
        >
          Add
        </Button>
      </List.Item>
    )}
  />
);

export default FoodItemList;
