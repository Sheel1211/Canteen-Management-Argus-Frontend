import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Select, Typography, Divider, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Link from 'antd/es/typography/Link';
import ShowErrorModal from '../../shared/components/ShowErrorModal';

const { Option } = Select;

const { Title } = Typography;
const Registration = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('Received values of form: ', values);
  
      const registrationRequestDTO = {
        "userName": values.username,
        "password": values.password,
        "role": values.role
      };
  
      const data = await register(registrationRequestDTO);
  
      Modal.success({
        title: "Registration Successful!",
        content: "You are registered successfully!",
      });
  
      console.log(data);
    } catch (error) {
      console.error("Registration failed: ", error);
  
      ShowErrorModal(error.response.data);

      // Modal.error({
      //   title: "Registration Failed",
      //   content: error.response?.data?.message || 
      //            error.message || 
      //            "Something went wrong. Please try again later.",
      // });
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login'); 
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
          REGISTRATION
        </Title>
        <Form
          name="registration"
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

          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select at least one role!' }]}
          >
            <Select
              mode="single"
              placeholder="Select roles"
              allowClear
            >
              <Option value="ROLE_EMPLOYEE">Employee</Option>
              <Option value="ROLE_CANTEEN_MANAGER">Canteen Manager</Option>
              <Option value="ROLE_CANTEEN_OWNER">Canteen Owner</Option>
              <Option value="ROLE_ADMIN">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>            
            <Divider>OR</Divider>
            <div style={{textAlign:'center'}}>
            <Link onClick={handleLoginClick} style={{ cursor: 'pointer'}}>Login In!</Link>
            </div>
          </Form.Item>
        </Form>
        </div>
      </Col>
      
    </Row>
  );
};

export default Registration;
