import { createSlice } from "@reduxjs/toolkit";

type CharState = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const initialState: CharState = {
  id: 0,
  name: "",
  description: "",
  image: "",
};

export const charSlice = createSlice({
  name: "char",
  initialState,
  reducers: {
    save(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.image = action.payload.image;
    },
    reset(state) {
      state.id = 0;
      state.name = "";
      state.description = "";
      state.image = "";
    },
  },
});

export const { save, reset } = charSlice.actions;
export default charSlice.reducer;
