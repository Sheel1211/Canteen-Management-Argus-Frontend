import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { fetchAllCanteens, postCanteen } from "../services/adminService";
import { setCanteens } from "../slices/canteenSlice";
import { useDispatch } from "react-redux";
import ShowErrorModal from "../../shared/components/ShowErrorModal";

const CreateCanteen = ({ closeModal }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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

    const onFinish = async (values) => {
        try {
            console.log("Received values of form: ", values);
            const response = await postCanteen(values);
            console.log("Canteen created successfully:", response);
            Modal.success({
                title: "Canteen Created Successfully!",
                content: "The canteen has been created successfully.",
              });
            const updatedCanteens = await fetchAllCanteens();
            dispatch(setCanteens({ canteens: updatedCanteens }));
            form.resetFields();
            closeModal();
        } catch (error) {
            console.error("Error creating canteen:", error);
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
                    label="Canteen Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter the canteen name!" },
                    ]}
                >
                    <Input placeholder="Enter canteen name" />
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

export default CreateCanteen;
