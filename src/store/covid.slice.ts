import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, StatsicsInterface } from "../interface/staticInterface";
import axios from "axios";

interface initialStateInterface {
  isLoading: boolean;
  error: string | undefined;
  countries: Result[];
  country: Result | undefined;
}

const initialState: initialStateInterface = {
  isLoading: false,
  error: "",
  countries: [],
  country: undefined,
};

export const getAllStatsics = createAsyncThunk(
  "getAllStatsics",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<StatsicsInterface>(
        "https://covid-node.vercel.app/city/getAll"
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const countriesSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    filteredCity: (state, action: PayloadAction<string>) => {
      state.country = state.countries.find(
        (item) => item.id === action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllStatsics.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getAllStatsics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.countries = action.payload.result;
    });
    builder.addCase(getAllStatsics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default countriesSlice.reducer;
export const { filteredCity, setLoading } = countriesSlice.actions;
