import { createSlice } from "@reduxjs/toolkit";

type CharState = {
  name: string;
  description: string;
  image: string;
};

const initialState: CharState = {
  name: "",
  description: "",
  image: "",
};

export const charSlice = createSlice({
  name: "char",
  initialState,
  reducers: {
    save(state, action) {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.image = action.payload.image;
    },
    reset(state) {
      state.name = "";
      state.description = "";
    },
  },
});

export const { save, reset } = charSlice.actions;
export default charSlice.reducer;
