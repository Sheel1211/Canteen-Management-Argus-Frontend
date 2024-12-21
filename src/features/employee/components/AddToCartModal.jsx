import React, { useState } from "react";
import { Modal, Form, Select, Button, Input } from "antd";
import ReceiverFields from "./ReceiverFields";
import { debounce } from "lodash";
import { fetchUsersByUsername } from "../services/orderService";

const AddToCartModal = ({ visible, onClose, onAddToCart, selectedFoodItem, menuId, batches }) => {
    const [form] = Form.useForm();

    const [userSuggestions, setUserSuggestions] = useState([]);
    const [searchingUsers, setSearchingUsers] = useState(false);

    const handleAddToCart = (values) => {
        const newCartItems = values.receivers.map(({ receiver, quantity, batch }) => ({
            foodItem: selectedFoodItem,
            receiver,
            quantity,
            menuId,
            batchId: batch,
        }));
        onAddToCart(newCartItems);
        onClose();

        form.resetFields();
    };


    const handleFetchUserSuggestions = async (query) => {
        if (query.length < 3) {
            setUserSuggestions([]);
            return;
        }

        setSearchingUsers(true);

        try {
            const suggestions = await fetchUsersByUsername(query);
            setUserSuggestions(suggestions);
        } catch (error) {
            console.error("Error fetching user suggestions:", error);
        } finally {
            setSearchingUsers(false);
        }
    };
    const debouncedFetchUserSuggestions = debounce(handleFetchUserSuggestions, 300);

    const handleSelectReceivers = (selectedUsernames) => {
        const fields = selectedUsernames.map((user) => ({
            receiver: JSON.parse(user),
            receiverName: JSON.parse(user).userName,
            quantity: 1,
            batch: null,
        }));

        form.setFieldsValue({ receivers: fields });

    };

    return (
        <Modal
            title="Add to Cart"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAddToCart}>
                <ReceiverFields
                    form={form}
                    batches={batches}
                    userSuggestions={userSuggestions}
                    searchingUsers={searchingUsers}
                    handleSelectReceivers={handleSelectReceivers}
                    debouncedFetchUserSuggestions={debouncedFetchUserSuggestions}
                />
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Add to Cart
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddToCartModal;
