import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, Row, Col, Modal } from "antd";
import { fetchCategories, postFoodItem } from "../services/menuServices";
import TextArea from "antd/es/input/TextArea";
import ShowErrorModal from "../../shared/components/ShowErrorModal";

const CreateFoodItem = ({ closeModal }) => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

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
    console.log("Categories fetched:", categories);
  }, [categories]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const categoryOptions = categories.map((category) => ({
    label: category.type,
    value: category.id,
  }));

  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      const response = await postFoodItem(values);
      console.log("Food item submitted successfully:", response);
      Modal.success({
        title: "Food Item Submitted Successfully!",
        content: "The food item has been submitted successfully.",
      });
      form.resetFields();
      closeModal();
    } catch (error) {
      console.error("Error submitting food item:", error);

      ShowErrorModal(error.response.data);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Food Item Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the food item name!" },
          ]}
        >
          <Input placeholder="Enter food item name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber
            placeholder="Enter price"
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantityPerPlate"
          rules={[{ required: true, message: "Please enter the quantity!" }]}
        >
          <Input placeholder="Enter quantity (e.g., 1 kg, 500 ml)" />
        </Form.Item>
        <Form.Item
          label="Categories"
          name="categories"
          rules={[
            { required: true, message: "Please select at least one category!" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select categories"
            allowClear
            options={categoryOptions}
          />
        </Form.Item>
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

export default CreateFoodItem;
