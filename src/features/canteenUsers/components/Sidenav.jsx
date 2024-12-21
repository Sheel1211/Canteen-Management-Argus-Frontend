// import { Menu, Modal } from "antd";
// import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
// import CreateFoodItem from "./CreateFoodItem";
// import CreateMenuForm from "./CreateMenuForm";
// import logo from "../../../assets/images/logo.png";

// function Sidenav({ color }) {
//   const { pathname } = useLocation();
//   const page = pathname.replace("/", "");

//   const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);
//   const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

//   const handleCancel = (type) => {
//     if (type === "foodItem") {
//       setIsFoodItemModalOpen(false);
//     } else if (type === "menu") {
//       setIsMenuModalOpen(false);
//     }
//   };

//   const dashboard = (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
//         fill={color}
//       ></path>
//       <path
//         d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
//         fill={color}
//       ></path>
//       <path
//         d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
//         fill={color}
//       ></path>
//     </svg>
//   );

//   return (
//     <>
//       <div className="brand">
//         <img src={logo} alt="logo" />
//         <span>Canteen-user Dashboard</span>
//       </div>
//       <hr />
//       <Menu theme="light" mode="inline">
//         <Menu.Item key="1">
//           <NavLink to="/canteen-user/dashboard">
//             <span
//               className="icon"
//               style={{
//                 background: page === "canteen-user" ? color : "",
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
//                   background: page.includes("food-items") ? color : "",
//                   marginLeft:"-1vw",
//                 }}
//               >
//                 {dashboard}
//               </span> 
//               <span className="label">
//                 Food Items
//               </span>
//             </span>
//           }
//         >
//           <Menu.Item key="2-1">
//             <NavLink onClick={() => setIsFoodItemModalOpen(true)}>
//               Create Food Item
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="2-2">
//             <NavLink to="view-food-items">View Food Items</NavLink>
//           </Menu.Item>
//         </Menu.SubMenu>

//         <Menu.SubMenu
//           key="3"
//           title={
//             <span>
//               <span
//                 className="icon"
//                 style={{
//                   background: page.includes("menu") ? color : "",
//                   marginLeft:"-1vw",
//                 }}
//               >
//                 {dashboard}
//               </span>
//               <span className="label">
//                 Menus
//               </span>
//             </span>
//           }
//         > 
//           <Menu.Item key="3-1">
//             <NavLink onClick={() => setIsMenuModalOpen(true)}>
//               Create Menu
//             </NavLink>
//           </Menu.Item>
//           <Menu.Item key="3-2">
//             <NavLink to="view-menus">View Menus</NavLink>
//           </Menu.Item>
//         </Menu.SubMenu>

//         <Menu.Item key="4">
//           <NavLink to="/canteen-user/orders">
//             <span
//               className="icon"
//               style={{
//                 background: page === "orders" ? color : "",
//               }}
//             >
//               {dashboard}
//             </span>
//             <span className="label">Orders</span>
//           </NavLink>
//         </Menu.Item>
//       </Menu>

//       <Modal
//         title="Create Food Item"
//         open={isFoodItemModalOpen}
//         onCancel={() => handleCancel("foodItem")}
//         footer={null}
//       >
//         {isFoodItemModalOpen && (
//           <CreateFoodItem closeModal={() => setIsFoodItemModalOpen(false)} />
//         )}
//       </Modal>

//       <Modal
//         title="Create Menu"
//         open={isMenuModalOpen}  
//         onCancel={() => handleCancel("menu")}
//         footer={null}
//       >
//         {isMenuModalOpen && (
//           <CreateMenuForm closeModal={() => setIsMenuModalOpen(false)} />
//         )}
//       </Modal>
//     </>
//   );
// }

// export default Sidenav;


import { Menu, Modal } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import CreateFoodItem from "./CreateFoodItem";
import CreateMenuForm from "./CreateMenuForm";
import logo from "../../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  const handleCancel = (type) => {
    if (type === "foodItem") {
      setIsFoodItemModalOpen(false);
    } else if (type === "menu") {
      setIsMenuModalOpen(false);
    }
  };

  const onSubMenuClick = (key) => {
    setOpenKeys(openKeys.includes(key) ? [] : [key]);
  };

  const handleMenuItemClick = () => {
    setOpenKeys([]); 
  };

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

  return (
    <>
      <div className="brand">
        <img src={logo} alt="logo" />
        <span>Canteen-user Dashboard</span>
      </div>
      <hr />
      <Menu
        theme="light"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
      >
        <Menu.Item key="1">
          <NavLink to="/canteen-user/dashboard" onClick={handleMenuItemClick}>
            <span
              className="icon"
              style={{
                background: page === "canteen-user" ? color : "",
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
                  background: page.includes("food-items") ? color : "",
                  marginLeft: "-1vw",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Food Items</span>
            </span>
          }
          onTitleClick={() => onSubMenuClick("2")}
        >
          <Menu.Item key="2-1">
            <NavLink
              onClick={() => {
                setIsFoodItemModalOpen(true);
                handleMenuItemClick();
              }}
            >
              Create Food Item
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2-2">
            <NavLink
              to="view-food-items"
              onClick={handleMenuItemClick}
            >
              View Food Items
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="3"
          title={
            <span>
              <span
                className="icon"
                style={{
                  background: page.includes("menu") ? color : "",
                  marginLeft: "-1vw",
                }}
              >
                {dashboard}
              </span>
              <span className="label">Menus</span>
            </span>
          }
          onTitleClick={() => onSubMenuClick("3")}
        >
          <Menu.Item key="3-1">
            <NavLink
              onClick={() => {
                setIsMenuModalOpen(true);
                handleMenuItemClick();
              }}
            >
              Create Menu
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3-2">
            <NavLink
              to="view-menus"
              onClick={handleMenuItemClick}
            >
              View Menus
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="4">
          <NavLink to="/canteen-user/orders" onClick={handleMenuItemClick}>
            <span
              className="icon"
              style={{
                background: page === "orders" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Orders</span>
          </NavLink>
        </Menu.Item>
      </Menu>

      <Modal
        title="Create Food Item"
        open={isFoodItemModalOpen}
        onCancel={() => handleCancel("foodItem")}
        footer={null}
      >
        {isFoodItemModalOpen && (
          <CreateFoodItem closeModal={() => setIsFoodItemModalOpen(false)} />
        )}
      </Modal>

      <Modal
        title="Create Menu"
        open={isMenuModalOpen}
        onCancel={() => handleCancel("menu")}
        footer={null}
      >
        {isMenuModalOpen && (
          <CreateMenuForm closeModal={() => setIsMenuModalOpen(false)} />
        )}
      </Modal>
    </>
  );
}

export default Sidenav;
