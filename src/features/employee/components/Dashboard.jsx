import React, { useEffect, useState } from "react";
import { Table, Typography, Tag, Tabs, Select } from "antd";
import { fetchMenusService } from "../services/orderService";
import { fetchCategories } from "../../canteenUsers/services/menuServices";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Dashboard = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();


  const onRowClick = (record) => {
    console.log(record)
    navigate(`/employee/menu-details/${record.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuData = await fetchMenusService();

        const formattedData = menuData.map((menu) => ({
          ...menu,
          key: menu.id,
          foodItems: menu.menuFoodItemList.map((item) => item.foodItem.name).join(", "),
        }));
        setMenus(formattedData);
        setFilteredMenus(formattedData);

        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching menus or categories:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Menu Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Title level={5} style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {text}
        </Title>
      ),
    },
    {
      title: "Date",
      dataIndex: "dateOfMenu",
      key: "dateOfMenu",
      render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${dayName}, ${day}-${month}-${year}`;
      },
    },
    {
      title: "Canteen Name",
      dataIndex: "canteenName",
      key: "canteenName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Food Items",
      dataIndex: "foodItems",
      key: "foodItems",
      render: (foodItems) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {foodItems.split(", ").map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag>{text.type}</Tag>,
    },
  ];

  const handleTabChange = (key) => { 

    handleCategoryChange("all");

    let filteredData = menus;
    switch (key) {
      case "all":
        break;
      case "today":
        filteredData = filteredData.filter((menu) => {
          const menuDate = new Date(menu.dateOfMenu).toDateString();
          return menuDate === new Date().toDateString();
        });
        break;
      case "upcoming":
        filteredData = filteredData.filter(
          (menu) => new Date(menu.dateOfMenu) > new Date()
        );
        break;
      default:
        break;
    }

    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(
        (menu) => menu.category === selectedCategory
      );
    }

    setFilteredMenus(filteredData);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    let filteredData = menus;

    if (value !== "all") {
      filteredData = filteredData.filter((menu) => menu.category.id === value);
    }

    setFilteredMenus(filteredData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Upcoming Menus</Title>
      <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Tabs defaultActiveKey="all" onChange={handleTabChange} style={{ flex: 1 }}>
          <TabPane tab="All Menus" key="all" />
          <TabPane tab="Today's Menus" key="today" />
          <TabPane tab="Upcoming Menus" key="upcoming" />
        </Tabs>
        <Select
          placeholder="Filter by Category"
          style={{ width: 200 }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <Option value="all">All Categories</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.type}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredMenus}
        rowKey="id"
        style={{ wordBreak: "break-word", cursor: "pointer" }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </div>
  );
};

export default Dashboard;
