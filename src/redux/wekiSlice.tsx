import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface CreatePayload {
  Id: string;
  creater: string;
  content:string;
}

interface UpdatewekiingPayload {
  id: string;
  name: string;
  creater: string;
  contactor:Object[];
}
interface wekiingState {
  isLoading: boolean;
  wekiing: object | null; // You might want to define a more specific type here
  wekiings: Array<object> | null; // Define a more specific type here if possible
  error: string;
}
interface GetPayload{
  Id : string;
}
export const createwekiing = createAsyncThunk(
  "/wekiing/create",
  async (payload: CreatePayload) => {
    // const { name, creater,contactor } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        'http://localhost:5001/api/wekiing/create',
        {
         payload
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const getwekiing = createAsyncThunk(
  "/wekiing/get",
  async (payload: GetPayload) => {    
    const { Id } = payload;
    
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/wekiing/get/`+Id,

      );
      console.log(res.data);
      
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);
export const getwork = createAsyncThunk(
  "/work/get",
  async (payload: GetPayload) => {    
    const { Id } = payload;    
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/work/get/`+Id,

      );
      console.log(res.data);
      
      return res.data.wekiing;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const getAllwikiings = createAsyncThunk(
  "/wikiing/get",
  async () => {    
    try {
      
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/wikiing/get`
      );
      // console.log(res.data);
      
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);



export const updatewekiing = createAsyncThunk(
  "/api/wekiing/update",
  
  async (payload: UpdatewekiingPayload) => {
    console.log(payload);
    
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/wekiing/update/`+payload.Id,
        {
          payload
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const deletework = createAsyncThunk(
  "/api/work/delete",
  async (payload: string) => {
    try {
      console.log(payload);
      
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/work/delete`,
        {
          payload,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);
export const deletewekiing = createAsyncThunk(
  "/api/wekiing/delete",
  async (payload: string) => {
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/wekiing/delete`,
        {
          payload,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const wekiSlice = createSlice({
  name: "wekiing",
  initialState: {
    isLoading: false,
    wekiing: null,
    wekiings: null,
    error: "",
  } as wekiingState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(createwekiing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createwekiing.fulfilled, (state, { payload }) => {
          state.wekiing = payload.wekiing;
        state.isLoading = false;
      })
      .addCase(createwekiing.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getwork.fulfilled, (state, { payload }) => {
          state.wekiing = payload.wekiing;
        state.isLoading = false;
      })
      .addCase(getwork.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      
      .addCase(updatewekiing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatewekiing.fulfilled, (state, { payload }) => {
        state.error = payload?.message;
        state.isLoading = false;
      })
      .addCase(updatewekiing.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      });
  },
});

export default wekiSlice.reducer;
