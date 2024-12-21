import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col, InputNumber, Modal } from "antd";
import {
  fetchCategories,
  fetchFoodItemsByCanteenIdAndCategory,
  postMenu,
} from "../services/menuServices";
import ShowErrorModal from "../../shared/components/ShowErrorModal";

const CreateMenuForm = ({ closeModal }) => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [form] = Form.useForm();
  const canteenId = 1; 

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const buttonStyle = {
    flex: 1,
    margin: "0 0.5rem",
    padding: "0.5rem 1.5rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    try {
      form.setFieldsValue({ foodItemListIds: [] });
      setFoodItems([]);
      setSelectedFoodItems({});
      console.log("After reset:", {
        formValues: form.getFieldsValue(),
        selectedFoodItems,
      });

      if (categoryId) {
        const foodItemData = await fetchFoodItemsByCanteenIdAndCategory({
          canteenId,
          categoryId,
        });
        setFoodItems(foodItemData);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const handleFoodItemSelect = (foodItemIds) => {
    const updatedSelection = {};
    foodItemIds.forEach((id) => {
      updatedSelection[id] = selectedFoodItems[id] || 1;
    });
    setSelectedFoodItems(updatedSelection);
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedFoodItems((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const categoryOptions = categories.map((category) => ({
    label: category.type,
    value: category.id,
  }));

  const foodItemOptions = foodItems.map((foodItem) => ({
    label: foodItem.name,
    value: foodItem.id,
  }));

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        dateOfMenu: values.dateOfMenu.format("YYYY-MM-DD"),
        menuFoodItemList: Object.entries(selectedFoodItems).map(([id, quantity]) => ({
          foodItemId:id,
          quantity,
        })),
      };

      delete formattedValues["foodItemListIds"];
      

      console.log("Formatted values for backend:", formattedValues);

      const response = await postMenu(formattedValues);
      Modal.success({
        title: "Menu Created Successfully!",
        content: "The menu has been created and submitted successfully.",
      });
      form.resetFields();
      setSelectedFoodItems({});
      setFoodItems([]);
      closeModal();
    } catch (error) {
      ShowErrorModal(error.response.data);
      console.error("Error submitting menu:", error);
    }
  };

  const onReset = () => {
    form.resetFields();
    setFoodItems([]);
    setSelectedFoodItems({});
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Menu Name"
          name="name"
          rules={[{ required: true, message: "Please enter the menu name!" }]}
        >
          <Input placeholder="Enter menu name" />
        </Form.Item>
        <Form.Item
          label="Menu Date"
          name="dateOfMenu"
          rules={[{ required: true, message: "Please select the menu date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => {
              return current && current < new Date().setHours(0, 0, 0, 0);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder="Select category"
            allowClear
            options={categoryOptions}
            onChange={handleCategoryChange}
          />
        </Form.Item>
        <Form.Item
          label="Food Items"
          name="foodItemListIds"
          rules={[{ required: true, message: "Please select food items!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select food items"
            allowClear
            options={foodItemOptions}
            onChange={handleFoodItemSelect}
          />
        </Form.Item>
        {Object.entries(selectedFoodItems).map(([id, quantity]) => {
          const foodItem = foodItems.find((item) => item.id === parseInt(id));
          return (
            <Form.Item label={`${foodItem?.name} Quantity`} key={id}>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => handleQuantityChange(id, value)}
              />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Row>
            <Col span={24}>
              <div style={buttonContainerStyle}>
                <Button type="default" onClick={onReset} style={buttonStyle}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" style={buttonStyle}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateMenuForm;
