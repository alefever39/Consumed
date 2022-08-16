import { createSlice } from "@reduxjs/toolkit";
/////////////////////////////////////////////// Reducer
const initialState = {
  media: [],
  series: {},
  loaded: false,
  editInfo: {},
  filter: "all",
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    getMedia: (state, action) => {
      state.media = action.payload;
    },
    getSeriesInfo: (state, action) => {
      state.series = action.payload;
    },
    editInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    mediaFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { getMedia, getSeriesInfo, editInfo, mediaFilter } =
  mediaSlice.actions;
export default mediaSlice.reducer;
