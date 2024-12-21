import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import { Flex, Image, Layout, Space, Typography } from "antd";

const { Header, Content } = Layout;

const headerStyle = {
  TypographyAlign: "center",
  color: "#fff",
  height: 64,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};



const layoutStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const Landing = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderComponent />
      </Header>

    
      <Layout
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh', 
        backgroundColor: '#ffffff',
      }}
    >
      <Space
        justify="space-around"
        style={{
          padding: '1vw',
          alignItems: 'center',
          textAlign: 'center', 
        }}
      >
        <div style={{ maxWidth: '60%', lineHeight: '1.5', color: '#333' }}>
          <Typography style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.4', color: '#2c3e50' }}>
            Revolutionizing the way canteens operate!
          </Typography>
          <br />
          <Typography style={{ fontSize: '18px', fontWeight: 'normal', lineHeight: '1.6', color: '#7f8c8d' }}>
            Our Canteen Management System streamlines food ordering, payment processing, and batch management for a
            seamless experience. With user-friendly features like role-based access, dynamic menu creation, and real-time
            order tracking, we’re transforming the daily dining experience for employees and managers alike.
          </Typography>
          <br />
          <Typography style={{ fontSize: '18px', fontWeight: 'normal', lineHeight: '1.6', color: '#3498db' }}>
            Get ready for a hassle-free, tech-powered dining experience that’s efficient, fun, and customizable!
          </Typography>
        </div>

        <Image
          src="cms-landing.jpeg"
          preview={false}
          style={{
            width: '150vw',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Space>
    </Layout>

    </Layout>
  );
};

export default Landing;
