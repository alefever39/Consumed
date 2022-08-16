import { createSlice } from "@reduxjs/toolkit";
/////////////////////////////////////////////// Reducer
const initialState = {
  selectedPage: "home",
  addType: "create",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setAddType: (state, action) => {
      state.addType = action.payload;
    },
  },
});

export const { setSelectedPage, setAddType } = pageSlice.actions;
export default pageSlice.reducer;
