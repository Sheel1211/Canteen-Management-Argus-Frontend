import React from "react";
import { Row, Col, Button, Typography } from "antd";

const { Title, Text } = Typography;

const MenuHeader = ({ menuName, canteenName, cartCount, onViewCart }) => (
  <Row justify="space-between" align="middle">
    <Col>
      <Title level={4}>{menuName}</Title>
      <Text type="secondary">{canteenName}</Text>
    </Col>
    <Col>
      <Button type="primary" onClick={onViewCart}>
        View Cart ({cartCount})
      </Button>
    </Col>
  </Row>
);

export default MenuHeader;
