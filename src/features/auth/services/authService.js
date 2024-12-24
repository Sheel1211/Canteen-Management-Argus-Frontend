import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { logout, setLoading, setLogin } from "../slices/authSlice";
import store from "../../../store";

export const login = async (userData) => {
  try {
    store.dispatch(setLoading(true));
    const response = await axios.post(`${BACKEND_URL}/auth/login`, userData, {
      withCredentials: true,
    });

    store.dispatch(
      setLogin({
        user: response.data,
      })
    );

    localStorage.setItem("token", "token");

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  } finally {
    store.dispatch(setLoading(false)); 
  }
};

export const register = async (userData) => {
  try {
    store.dispatch(setLoading(true)); 
    const response = await axios.post(`${BACKEND_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  } finally {
    store.dispatch(setLoading(false));
  }
};

export const fetchUserData = async () => {
  try {
    store.dispatch(setLoading(true)); 
    const response = await axios.get(`${BACKEND_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  } finally {
    store.dispatch(setLoading(false)); 
  }
}

export const logoutUser = async () => {
  try {
    store.dispatch(setLoading(true)); 
    const response = await axios.get(`${BACKEND_URL}/auth/logout`, {
      withCredentials: true,
    });

  
    store.dispatch(logout());
    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  } finally {
    store.dispatch(setLoading(false)); 
  }
}