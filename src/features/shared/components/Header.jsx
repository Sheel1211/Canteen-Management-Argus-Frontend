import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { logout } from "../../auth/slices/authSlice";
import { logoutUser } from "../../auth/services/authService";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress }) {
  window.scrollTo(0, 0);

  const { user, isLoading } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      setUserName(user.userName);
    }
  }, [isLoading, user]);

  const handleLogout = () => {
    logoutUser();
    Modal.success({
      title: "Logout Successful",
      content: "You have logged out successfully!",
    });
    navigate("/");
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {isLoading ? <Loader /> : `Hi, ${userName || "Guest"}!`}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          {userName !== "Guest" ? (
            <Button type="link" className="btn-logout" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login" className="btn-sign-in">
              <span>Sign in</span>
            </Link>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Header;
