import React from "react";
import { Modal, List, Button, Typography } from "antd";

const { Title } = Typography;

const CartModal = ({ visible, onClose, cart, batches, onOrder }) => (
  <Modal
    title="Your Cart"
    visible={visible}
    onCancel={onClose}
    footer={null}
  >
    <List
      dataSource={cart}
      renderItem={(cartItem) => (
        <List.Item style={{ padding: "1rem" }}>
          <div>
            <Title level={5}>{cartItem.foodItem.name}</Title>
            <p><b>Receiver:</b> {cartItem.receiver.userName}</p>
            <p><b>Quantity:</b> {cartItem.quantity}</p>
            <p><b>Batch:</b> {batches.find((b) => b.id === cartItem.batchId)?.timeSlot}</p>
          </div>
        </List.Item>
      )}
    />
    <Button type="primary" onClick={onOrder} style={{ width: "100%", marginTop: "1rem" }}>
      Order Now
    </Button>
  </Modal>
);

export default CartModal;
