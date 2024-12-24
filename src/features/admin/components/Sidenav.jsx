// import { Menu, Modal } from "antd";
// import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
// import CreateCanteen from "./CreateCanteen";
// import logo from "../../../assets/images/logo.png";

// function Sidenav({ color }) {
//   const { pathname } = useLocation();
//   const page = pathname.replace("/", "");

  // const dashboard = (
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
  //       fill={color}
  //     ></path>
  //     <path
  //       d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
  //       fill={color}
  //     ></path>
  //     <path
  //       d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
  //       fill={color}
  //     ></path>
  //   </svg>
  // );

//   const [CanteenModalOpen, setCanteenModalOpen] = useState(false);

//   const handleCancel = () => {
//     setCanteenModalOpen(false); 
//   };

//   return (
//     <>
//       <div className="brand">
//         <img src={logo} alt="logo" />
//         <span>Admin Dashboard</span>
//       </div>
//       <hr />
//       <Menu theme="light" mode="inline">
//         <Menu.Item key="1">
//           <NavLink to="/admin/dashboard">
//             <span
//               className="icon"
//               style={{
//                 background: page === "admin" ? color : "",
//               }}
//             >
//               {dashboard}
//             </span>
//             <span className="label">Dashboard</span>
//           </NavLink>
//         </Menu.Item>

//         <Menu.SubMenu
//           key="2"
//           title={
//             <span>
//               <span
//                 className="icon"
//                 style={{
//                   background: page.includes("create-canteen") ? color : "",
//                 }}
//               >
//                 {dashboard}
//               </span> 
//               <span className="label" style={{ marginLeft: "8px" }}>
//                 Canteen
//               </span>
//             </span>
//           }
//         >
//           <Menu.Item key="2-1">
//             <NavLink onClick={() => setCanteenModalOpen(true)}>
//               Create Canteen
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="2-2">
//             <NavLink to="view-all-canteens">View All Canteens</NavLink>
//           </Menu.Item>
//         </Menu.SubMenu>
//       </Menu>

//       {/* Modal to Create Canteen */}
//       <Modal
//         title="Create Canteen"
//         open={CanteenModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <CreateCanteen closeModal={handleCancel} />
//       </Modal>
//     </>
//   );
// }

// export default Sidenav;



import { Menu, Modal } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CreateCanteen from "./CreateCanteen";
import logo from "../../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const [CanteenModalOpen, setCanteenModalOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  const dashboard = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>
  );



  const handleCancel = () => {
    setCanteenModalOpen(false);
  };

  const onSubMenuClick = (key) => {
    setOpenKeys(openKeys.includes(key) ? [] : [key]); 
  };

  const handleMenuItemClick = () => {
    setOpenKeys([]);
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="logo" />
        <span>Admin Dashboard</span>
      </div>
      <hr />
      <Menu
        theme="light"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
      >
        <Menu.Item key="1">
          <NavLink to="/admin/dashboard" onClick={handleMenuItemClick}>
            <span
              className="icon"
              style={{
                background: page === "admin" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>

        <Menu.SubMenu
          key="2"
          title={
            <span>
              <span
                className="icon"
                style={{
                  background: page.includes("create-canteen") ? color : "",
                  marginLeft: "-1vw",
                }}
              >
                {dashboard}
              </span>
              <span className="label" style={{ marginLeft: "8px" }}>
                Canteen
              </span>
            </span>
          }
          onTitleClick={() => onSubMenuClick("2")}
        >
          <Menu.Item key="2-1">
            <NavLink
              onClick={() => {
                setCanteenModalOpen(true);
                handleMenuItemClick(); 
              }}
            >
              Create Canteen
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2-2">
            <NavLink to="view-all-canteens" onClick={handleMenuItemClick}>
              View All Canteens
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <Modal
        title="Create Canteen"
        open={CanteenModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateCanteen closeModal={handleCancel} />
      </Modal>
    </>
  );
}

export default Sidenav;
