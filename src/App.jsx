import Login from "./features/auth/pages/Login";
import Registration from "./features/auth/pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./features/shared/pages/Landing";
import CanteenUserDashboard from "./features/canteenUsers/components/Dashboard";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ViewFoodItems from "./features/canteenUsers/components/ViewFoodItems";
import Home from "./features/canteenUsers/pages/Home";
import ViewMenuCalender from "./features/canteenUsers/components/ViewMenuCalender";
import AdminHome from "./features/admin/pages/Home";
import EmployeeHome from "./features/employee/pages/Home";
import AdminDashboard from "./features/admin/components/Dashboard";
import EmployeeDashboard from "./features/employee/components/Dashboard";
import ViewAllCanteens from "./features/admin/components/ViewAllCanteens";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./features/auth/services/authService";
import { setFetchedUserData } from "./features/auth/slices/authSlice";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import MenuDetails from "./features/employee/components/MenuDetails";
import EmployeeTransactions from "./features/employee/components/EmployeeTransactions";
import ViewCanteenOrders from "./features/canteenUsers/components/ViewCanteenOrders";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(); 
        dispatch(setFetchedUserData(response)); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); 
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />


          <Route path="/canteen-user" element={<PrivateRoute allowedRoles={["ROLE_CANTEEN_MANAGER","ROLE_CANTEEN_OWNER"]}><Home /></PrivateRoute>}>
            <Route path="dashboard" element={<CanteenUserDashboard />} />
            <Route path="view-food-items" element={<ViewFoodItems />} />
            <Route path="view-menus" element={<ViewMenuCalender />} />
            <Route path="orders" element={<ViewCanteenOrders />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><AdminHome /></PrivateRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="view-all-canteens" element={<ViewAllCanteens />} />
          </Route>

          <Route path="/employee" element={<PrivateRoute allowedRoles={["ROLE_EMPLOYEE"]}><EmployeeHome /></PrivateRoute>}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="menu-details/:menuId" element={<MenuDetails />} />
            <Route path="transactions" element={<EmployeeTransactions />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
