import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Select, Typography, Divider, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Link from 'antd/es/typography/Link';
import ShowErrorModal from '../../shared/components/ShowErrorModal';


const { Title } = Typography;
const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('Received values of form: ', values);

      const loginRequestDTO = {
        "userName": values.username,
        "password": values.password,
      };

      const userData = await login(loginRequestDTO);

      Modal.success({
        title: "Login Successful",
        content: "You have logged in successfully!",
      });

      
      if (userData.role.name == "ROLE_CANTEEN_MANAGER" || userData.role.name == "ROLE_CANTEEN_OWNER") {
        navigate("/canteen-user/dashboard");
      } else if (userData.role.name == "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.error("Login failed: ", error);

      // Modal.error({
      //   title: "Login Failed",
      //   content: error.response?.data?.message ||
      //     error.message ||
      //     "Something went wrong during login. Please try again.",
      // });

      ShowErrorModal(error.response.data);
    }
  };


  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            LOGIN
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>


            <Form.Item>
              <Row justify="space-between" align="middle">
                <Col>
                  <a href="">Forgot password</a>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              <Divider>OR</Divider>
              <div style={{ textAlign: "center" }}>
                <Link onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>Register now!</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
