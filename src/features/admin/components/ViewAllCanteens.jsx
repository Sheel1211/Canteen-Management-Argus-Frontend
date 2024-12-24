import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Tag } from "antd";
import { fetchAllCanteens } from "../services/adminService";
import { setCanteens } from "../slices/canteenSlice";
import { useDispatch, useSelector } from "react-redux";

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

const ViewAllCanteens = () => {
  const dispatch = useDispatch();
  const { canteens, isLoading } = useSelector((state) => state.canteens); 

  useEffect(() => {
    const fetchCanteensData = async () => {
      try {
        const data = await fetchAllCanteens();
        dispatch(setCanteens({ canteens: data }));

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCanteensData();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={canteens}
      rowKey="id"
      style={{ wordBreak: "break-word" }}
    />
  );
};

export default ViewAllCanteens;
