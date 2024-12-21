import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


const Loader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />;

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <Spin indicator={antIcon} />
        </div>
    );
};

export default Loader;
