import { createSlice } from "@reduxjs/toolkit";
/////////////////////////////////////////////// Reducer
const initialState = {
  media: [],
  series: {},
  loaded: false,
  editInfo: {},
  filter: "all",
  defaultImageUrl:
    "https://assignments.ds106.us/wp-content/uploads/sites/4/2011/12/placeholder.png",
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    getMedia: (state, action) => {
      state.media = action.payload;
    },
    deleteMedia: (state, action) => {
      console.log("in delete media", state.media);
      state.media = state.media.filter(
        (medium) => medium.id !== action.payload
      );
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
    setDefaultImageUrl: (state, action) => {
      state.defaultImageUrl = action.payload;
    },
  },
});

export const {
  getMedia,
  getSeriesInfo,
  editInfo,
  mediaFilter,
  deleteMedia,
  setDefaultImage,
} = mediaSlice.actions;
export default mediaSlice.reducer;
