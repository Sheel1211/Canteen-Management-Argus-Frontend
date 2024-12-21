import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Tag } from "antd";
import { fetchFoodItemsByCanteenId } from "../services/menuServices";

const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <Title level={5} style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {text}
      </Title>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => (
      <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{text}</div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => <span>₹ {price}</span>,
  },
  {
    title: "Quantity",
    dataIndex: "quantityPerPlate",
    key: "quantity",
  },
  {
    title: "Categories",
    dataIndex: "categories",
    key: "categories",
    render: (categories) => (
      <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
        {categories.map((category, index) => (
          <Tag key={index}>{category.type}</Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Button type="primary" onClick={() => handleClick(record)}>
        View
      </Button>
    ),
  },
];

const handleClick = (record) => {
  console.log("Viewing details for:", record);
};

const ViewFoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItemsData = async () => {
      try {
        const data = await fetchFoodItemsByCanteenId(1);
        const newData = data.map((foodItem) => ({
          ...foodItem,
          key: foodItem.id,
          canteen: foodItem.canteen.name,
        }));
        setFoodItems(newData);
        console.log(newData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchFoodItemsData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={foodItems}
      rowKey="id"
      style={{ wordBreak: "break-word" }}
    />
  );
};

export default ViewFoodItems;
