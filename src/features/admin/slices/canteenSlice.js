import { createSlice } from '@reduxjs/toolkit';

const canteenSlice = createSlice({
    name: 'canteenSlice',
    initialState: {
        isLoading:true,
        canteens:[],
    },
    reducers: {
      setCanteens: (state, action) => {
        state.canteens = action.payload.canteens
        isLoading:false
      },
    },
});

export const { setCanteens} = canteenSlice.actions;
export default canteenSlice.reducer;
