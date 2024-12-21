// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchMenuById, fetchBatches, fetchUsersByUsername, orderItems } from "../services/orderService";
// import { List, Typography, Divider, Button, Modal, Form, Input, Select } from "antd";
// import Loader from "../../shared/components/Loader";
// import { debounce } from "lodash";
// import ShowErrorModal from "../../shared/components/ShowErrorModal";

// const { Title, Text } = Typography;

// const MenuDetails = () => {
//   const { menuId } = useParams();
//   const [menuDetails, setMenuDetails] = useState(null);
//   const [batches, setBatches] = useState([]);
//   const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [cartModalVisible, setCartModalVisible] = useState(false);
//   const [selectedFoodItem, setSelectedFoodItem] = useState(null);
//   const [userSuggestions, setUserSuggestions] = useState([]);
//   const [searchingUsers, setSearchingUsers] = useState(false);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const [menuData, batchData] = await Promise.all([fetchMenuById(menuId), fetchBatches()]);
//         setMenuDetails(menuData);
//         setBatches(batchData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [menuId]);

//   const showAddToCartModal = (foodItem) => {
//     console.log(menuDetails);
//     console.log("+++++++++++++++++++++++++");
//     setSelectedFoodItem(foodItem);
//     setModalVisible(true);
//   };

//   const handleFetchUserSuggestions = async (query) => {
//     if (query.length < 3) {
//       setUserSuggestions([]);
//       return;
//     }

//     setSearchingUsers(true);

//     try {
//       const suggestions = await fetchUsersByUsername(query);
//       setUserSuggestions(suggestions);
//     } catch (error) {
//       console.error("Error fetching user suggestions:", error);
//     } finally {
//       setSearchingUsers(false);
//     }
//   };

//   const debouncedFetchUserSuggestions = debounce(handleFetchUserSuggestions, 300);

//   const handleSelectReceivers = (selectedUsernames) => {
//     const fields = selectedUsernames.map((user) => ({
//       receiver: JSON.parse(user),
//       receiverName: JSON.parse(user).userName,
//       quantity: 1,
//       batch: null,
//     }));

//     form.setFieldsValue({ receivers: fields });

//   };

//   const handleAddToCart = (values) => {
//     const newCartItems = values.receivers.map(({ receiver, quantity, batch }) => ({
//       foodItem: selectedFoodItem,
//       receiver,
//       quantity,
//       menuId,
//       batchId:batch,
//     }));

//     const updatedCart = [...cart, ...newCartItems];
//     setCart(updatedCart);
//     sessionStorage.setItem("cart", JSON.stringify(updatedCart));
//     closeModal();

//     Modal.success({
//       title: "Items added to Cart",
//       content: "Your items has been successfully added to cart!",
//     });
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     form.resetFields();
//   };

//   const handleOrderNow = async () => {
//     try {
//       await orderItems(cart,menuId);
//       setCart([]);
//       sessionStorage.removeItem("cart");
//       setCartModalVisible(false);
//       Modal.success({
//         title: "Order Successful",
//         content: "Your order has been placed successfully!",
//       });
//     } catch (error) {
//       console.error("Order failed:", error);
//       ShowErrorModal(error.response.data);
//     }
//   };

//   const showCartModal = () => {
//     setCartModalVisible(true);
//   };

//   const closeCartModal = () => {
//     setCartModalVisible(false);
//   };

//   if (loading) return <Loader />;
//   if (!menuDetails) return <Text>No menu details found.</Text>;

//   const { name: menuName, canteenName, menuFoodItemList } = menuDetails;

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
//         <div>
//           <Title level={2}>{menuName}</Title>
//           <Text type="secondary">{canteenName}</Text>
//         </div>
//         <Button type="primary" onClick={showCartModal}>
//           View Cart ({cart.length})
//         </Button>
//       </div>

//       <Divider />

//       <List
//         dataSource={menuFoodItemList}
//         renderItem={(item) => (
//           <List.Item style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
//             <div style={{ flex: 1 }}>
//               <Title level={5} style={{ margin: 0 }}>{item.foodItem.name}</Title>
//               <p style={{ margin: "0.5rem 0" }}>
//                 <b>Description:</b> {item.foodItem.description}
//               </p>
//               <p style={{ margin: "0.5rem 0" }}>
//                 <b>Price:</b> ₹{item.foodItem.price.toFixed(2)}
//               </p>
//               <p style={{ margin: "0.5rem 0" }}>
//                 <b>Available Quantity:</b> {item.quantity}
//               </p>
//             </div>
//             <Button
//               type="primary"
//               onClick={() => showAddToCartModal(item.foodItem)}
//               style={{
//                 marginLeft: "1rem",
//                 flexShrink: 0,
//                 alignSelf: "center",
//                 padding: "0.5rem 1.5rem",
//               }}
//             >
//               Add
//             </Button>
//           </List.Item>
//         )}
//       />

//       <Modal
//         title="Add to Cart"
//         visible={modalVisible}
//         onCancel={closeModal}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleAddToCart}>
//           <Form.Item
//             label="Select Receiver(s)"
//             name="selectedUsers"
//           >
//             <Select
//               mode="multiple"
//               placeholder="Enter or select receiver names"
//               onChange={handleSelectReceivers}
//               onSearch={debouncedFetchUserSuggestions}
//               filterOption={false}
//               loading={searchingUsers}
//               notFoundContent={searchingUsers ? <Loader /> : <Typography>No User Found!</Typography>}
//             >
//               {userSuggestions.map((user) => (
//                 <Select.Option key={user.id} value={JSON.stringify(user)}>
//                   {user.userName}
//                 </Select.Option>
//               ))}

//             </Select>
//           </Form.Item>

//           <Form.List name="receivers">
//             {(fields) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <div key={key} style={{ display: "flex", marginBottom: "1rem", alignItems: "baseline" }}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "receiverName"]}
//                       rules={[{ required: true, message: "Receiver name is required!" }]}
//                       style={{ flex: 2 }}
//                     >
//                       <Input placeholder="Receiver Name" readOnly />
//                     </Form.Item>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "quantity"]}
//                       rules={[
//                         { required: true, message: "Quantity is required!" },
//                       ]}
//                       style={{ flex: 1, marginLeft: "1rem" }}
//                     >
//                       <Input type="number" placeholder="Quantity" />
//                     </Form.Item>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "batch"]}
//                       rules={[{ required: true, message: "Batch is required!" }]}
//                       style={{ flex: 1, marginLeft: "1rem" }}
//                     >
//                       <Select placeholder="Select Batch">
//                         {batches.map((batch) => (
//                           <Select.Option key={batch.id} value={batch.id}>
//                             {batch.timeSlot}
//                           </Select.Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   </div>
//                 ))}
//               </>
//             )}
//           </Form.List>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
//               Add to Cart
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="Your Cart"
//         visible={cartModalVisible}
//         onCancel={closeCartModal}
//         footer={null}
//       >
//         <div>
//           <List
//             dataSource={cart}
//             renderItem={(cartItem) => (
//               <List.Item style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
//                 <div style={{ flex: 1 }}>
//                   <Title level={5} style={{ margin: 0 }}>{cartItem.foodItem.name}</Title>
//                   <p style={{ margin: "0.5rem 0" }}>
//                     <b>Receiver:</b> {cartItem.receiver.userName}
//                   </p>
//                   <p style={{ margin: "0.5rem 0" }}>
//                     <b>Quantity:</b> {cartItem.quantity}
//                   </p>
//                   <p style={{ margin: "0.5rem 0" }}>
//                     <b>Batch:</b> {batches[cartItem.batchId-1].timeSlot}
//                   </p>
//                 </div>
//               </List.Item>
//             )}
//           />
//           <Button
//             type="primary"
//             onClick={handleOrderNow}
//             style={{ marginTop: "1rem", width: "100%" }}
//           >
//             Order Now
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default MenuDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, Typography, Divider, Button, Modal, Form } from "antd";
import Loader from "../../shared/components/Loader";
import ShowErrorModal from "../../shared/components/ShowErrorModal";
import MenuHeader from "./MenuHeader";
import FoodItemList from "./FoodItemList";
import AddToCartModal from "./AddToCartModal";
import CartModal from "./CartModal";
import { fetchMenuById, fetchBatches, orderItems } from "../services/orderService";

const { Text } = Typography;

const MenuDetails = () => {
  const { menuId } = useParams();
  const [menuDetails, setMenuDetails] = useState(null);
  const [batches, setBatches] = useState([]);
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [menuData, batchData] = await Promise.all([fetchMenuById(menuId), fetchBatches()]);
        setMenuDetails(menuData);
        setBatches(batchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [menuId]);

  const showAddToCartModal = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddToCart = (newCartItems) => {
    const updatedCart = [...cart, ...newCartItems];
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    closeModal();
  };

  const showCartModal = () => {
    setCartModalVisible(true);
  };

  const closeCartModal = () => {
    setCartModalVisible(false);
  };

  const handleOrderNow = async () => {
    if (cart.length === 0) {
      Modal.warning({
        title: "Cart is Empty",
        content: "Please add items to your cart before placing an order.",
      });
      return;
    }
    
    try {
      
      await orderItems(cart, menuId);
      setCart([]);
      sessionStorage.removeItem("cart");
      closeCartModal();
      Modal.success({
        title: "Order Successful",
        content: "Your order has been placed successfully!",
      });
    } catch (error) {
      console.error("Order failed:", error);
      ShowErrorModal(error.response.data);
    }
  };

  if (loading) return <Loader />;
  if (!menuDetails) return <Text>No menu details found.</Text>;

  return (
    <div>
      <MenuHeader
        menuName={menuDetails.name}
        canteenName={menuDetails.canteenName}
        cartCount={cart.length}
        onViewCart={showCartModal}
      />

      <Divider />

      <FoodItemList
        menuDetails={menuDetails}
        onAddToCart={showAddToCartModal}
      />

      <AddToCartModal
        visible={modalVisible}
        selectedFoodItem={selectedFoodItem}
        batches={batches}
        onClose={closeModal}
        onAddToCart={handleAddToCart}
        menuId={menuId}
      />

      <CartModal
        visible={cartModalVisible}
        cart={cart}
        batches={batches}
        onClose={closeCartModal}
        onOrder={handleOrderNow}
      />
    </div>
  );
};

export default MenuDetails;
