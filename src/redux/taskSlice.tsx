import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface CreatePayload {
  name: string;
  creater: string;
  contactor:Object[];
}

interface UpdatetaskPayload {
  id: string;
  name: string;
  creater: string;
  contactor:Object[];
}
interface taskState {
  isLoading: boolean;
  task: object | null; // You might want to define a more specific type here
  tasks: Array<object> | null; // Define a more specific type here if possible
  error: string;
}

export const createtask = createAsyncThunk(
  "/task/create",
  async (payload: CreatePayload) => {
    // const { name, creater,contactor } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        'http://localhost:5001/api/task/create',
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
export const creatework = createAsyncThunk(
  "/work/create",
  async (payload: CreatePayload) => {
    // const { name, creater,contactor } = payload;
    console.log(payload);
    
    try {
      const res: AxiosResponse = await axios.post(
        'http://localhost:5001/api/work/create',
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
// export const createtask = createAsyncThunk(
//   "/api/auth/login",
//   async (payload: GetPayload) => {
//     const { email, password } = payload;
//     try {
//       const res: AxiosResponse = await axios.post(
//         // `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
//         'http://localhost:5001/api/auth/login',
//         {
//           email,
//           password,
//         }
//       );
//       return res.data;
//     } catch (e: any) {
//       if (e.response) {
//         return { ...e.response.data, error: true };
//       }
//       return { error: true, message: "Server is not running correctly." };
//     }
//   }
// );

export const gettask = createAsyncThunk(
  "/work/get",
  async (payload: GetPayload) => {    
    const { Id } = payload;
    console.log(payload);
    
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/work/get/`+Id,

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
export const getwork = createAsyncThunk(
  "/work/get",
  async (payload: GetPayload) => {    
    const { Id } = payload;    
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/work/get/`+Id,

      );
      console.log(res.data);
      
      return res.data.task;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const getAllworks = createAsyncThunk(
  "/work/get",
  async () => {    
    try {
      
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/work/get`
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



export const updatetask = createAsyncThunk(
  "/api/task/update",
  
  async (payload: UpdatetaskPayload) => {
    console.log(payload);
    
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/task/update/`+payload._id,
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
export const deletetask = createAsyncThunk(
  "/api/task/delete",
  async (payload: string) => {
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/task/delete`,
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

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    task: null,
    tasks: null,
    error: "",
  } as taskState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(createtask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createtask.fulfilled, (state, { payload }) => {
          state.task = payload.task;
        state.isLoading = false;
      })
      .addCase(createtask.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getwork.fulfilled, (state, { payload }) => {
          state.task = payload.task;
        state.isLoading = false;
      })
      .addCase(getwork.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      
      .addCase(updatetask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatetask.fulfilled, (state, { payload }) => {
        state.error = payload?.message;
        state.isLoading = false;
      })
      .addCase(updatetask.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      });
  },
});

export default taskSlice.reducer;
