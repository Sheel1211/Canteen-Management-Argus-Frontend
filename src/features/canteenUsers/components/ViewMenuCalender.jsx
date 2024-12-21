import React, { useEffect, useState } from "react";
import { Calendar, Tag, Modal, List, Typography } from "antd";
import { fetchMenuForMonth } from "../services/menuServices";

const ViewMenuCalender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'));
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuDataForMonth, setMenuDataForMonth] = useState([]);
  let filteredItems = [];

  const [currentMonthYear, setCurrentMonthYear] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handlePanelChange = (value) => {
    const updatedMonthYear = {
      month: value.month() + 1,
      year: value.year(),
    };    

    const formattedDate = `${updatedMonthYear.year}-${String(updatedMonthYear.month).padStart(2, "0")}-01`;

    setCurrentMonthYear(updatedMonthYear);

    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      const fetchMenu = async () => {
        try {
          const responseData = await fetchMenuForMonth({ currentDate: selectedDate });
          setMenuDataForMonth(responseData);
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      };
      fetchMenu();
    }
  }, [currentMonthYear]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  
  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const categoriesList = [
      { type: "Breakfast", value: 1 },
      { type: "Lunch", value: 2 },
      { type: "Dinner", value: 3 },
    ];
    const isCategoryAvailable = (categoryId) => {
      return menuDataForMonth.some(
        (item) =>
          item.category.id === categoryId && item.dateOfMenu === date
      );
    };



    return (
      <div
        onClick={() => handleDateClick(date)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {categoriesList.map((category, index) => (
          <Tag
            key={index}
            color={isCategoryAvailable(category.value) ? "green" : "red"} 
            onClick={() => isCategoryAvailable(category.value) && handleCategoryClick(category.value)} 
            style={{
              cursor: isCategoryAvailable(category.value) ? "pointer" : "not-allowed", 
              backgroundColor: isCategoryAvailable(category.value) ? undefined : "#f5f5f5", 
              borderColor: isCategoryAvailable(category.value) ? undefined : "#d9d9d9", 
              color: isCategoryAvailable(category.value) ? undefined : "#a6a6a6", 
              marginBottom: "5px",
            }}
          >
            {category.type}
          </Tag>
        ))}
      </div>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const renderMenuItems = () => {
    console.log(selectedCategory + "  " + selectedDate);
    console.log(menuDataForMonth)
    filteredItems = menuDataForMonth.filter(
      (item) => item.category.id === selectedCategory && item.dateOfMenu === selectedDate
    );

    console.log(filteredItems)
    return (
      <List
        bordered
        dataSource={filteredItems[0] && filteredItems[0].menuFoodItemList}
        renderItem={(item) => (
          <List.Item>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              
              <Typography.Text strong style={{ fontSize: "18px" }}>
                {item.foodItem.name}
              </Typography.Text>

              <div style={{ marginBottom: "8px" }}>
                <Typography.Text>{item.foodItem.description}</Typography.Text>
              </div>

              <div>
                <Typography.Text strong style={{ color: "#52c41a" }}>
                  Price: ${item.foodItem.price}
                </Typography.Text>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <Typography.Text>{`Quantity: ${item.quantity}`}</Typography.Text>
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div style={{ paddingRight: "29px" }}>
      <Calendar
        cellRender={cellRender}
        onPanelChange={(value, mode) => handlePanelChange(value)}
      />
      <Modal
        visible={selectedCategory !== null}
        title={`Menu for ${selectedDate}`}
        onCancel={() => setSelectedCategory(null)} 
        footer={null}
        width={600}
      >
        {selectedCategory && renderMenuItems()}
      </Modal>
    </div>
  );
};

export default ViewMenuCalender;
