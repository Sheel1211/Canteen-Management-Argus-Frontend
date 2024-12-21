import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/auth/slices/authSlice"
import canteensReducer from "./features/admin/slices/canteenSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    canteens:canteensReducer,
  },
});