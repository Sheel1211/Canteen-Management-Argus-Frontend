import React from "react";
import { Form, Input, Select, Typography } from "antd";
import Loader from "../../shared/components/Loader";

const ReceiverFields = ({
    form,
    batches,
    userSuggestions,
    searchingUsers,
    handleSelectReceivers,
    debouncedFetchUserSuggestions,
}) => (


    <Form.List name="receivers">
        {(fields) => (
            <>
                <Form.Item
                    label="Select Receiver(s)"
                    name="selectedUsers"
                >
                    <Select
                        mode="multiple"
                        placeholder="Enter or select receiver names"
                        onChange={handleSelectReceivers}
                        onSearch={debouncedFetchUserSuggestions}
                        filterOption={false}
                        loading={searchingUsers}
                        notFoundContent={searchingUsers ? <Loader /> : <Typography>No User Found!</Typography>}
                    >
                        {userSuggestions.map((user) => (
                            <Select.Option key={user.id} value={JSON.stringify(user)}>
                                {user.userName}
                            </Select.Option>
                        ))}

                    </Select>
                </Form.Item>

                {fields.map(({ key, name, ...restField }) => (

                    <div key={key} style={{ display: "flex", marginBottom: "1rem" }}>
                        <Form.Item
                            {...restField}
                            name={[name, "receiverName"]}
                            rules={[{ required: true, message: "Receiver name is required!" }]}
                            style={{ flex: 2 }}
                        >
                            <Input placeholder="Receiver Name" readOnly />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, "quantity"]}
                            rules={[{ required: true, message: "Quantity is required!" }]}
                            style={{ flex: 1, marginLeft: "1rem" }}
                        >
                            <Input type="number" placeholder="Quantity" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, "batch"]}
                            rules={[{ required: true, message: "Batch is required!" }]}
                            style={{ flex: 1, marginLeft: "1rem" }}
                        >
                            <Select placeholder="Select Batch">
                                {batches.map((batch) => (
                                    <Select.Option key={batch.id} value={batch.id}>
                                        {batch.timeSlot}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </div>
                ))}
            </>
        )}
    </Form.List>
);

export default ReceiverFields;
