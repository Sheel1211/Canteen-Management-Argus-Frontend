import React from 'react'
import { Layout, Button, Space, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  backgroundColor: "#4096ff",
  height: "64px",
  color: "#fff",
};

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <Header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <HomeOutlined style={{ fontSize: "24px", color: "#fff" }} />
        <Title level={3} style={{ margin: 0, color: "#fff" }}>
          CMS
        </Title>
      </div>

      <Space>
        <Button type="link" onClick={(e)=>navigate("/login")} style={{ color: "#fff" }}>
          Login
        </Button>
        <Button type="primary" onClick={(e)=>navigate("/register")} style={{ backgroundColor: "#001529", borderColor: "#001529" }}>
          Register
        </Button> 
      </Space>
    </Header>
  )
}

export default HeaderComponent