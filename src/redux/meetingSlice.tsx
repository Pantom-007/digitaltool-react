import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface CreatePayload {
  name: string;
  create_user: string;
  invite_users:Object[];
}
interface GetPayload {
    Id: string;
}
interface UpdatemeetingPayload {
  _id:string;
  title: string;
  create_user: string;
  period: object;
  meeting:Object[];
  invite_users:Object[];
}
interface meetingState {
  isLoading: boolean;
  meeting: object | null; // You might want to define a more specific type here
  meetings: Array<object> | null; // Define a more specific type here if possible
  error: string;
}

export const createmeeting = createAsyncThunk(
  "/meeting/create",
  async (payload: CreatePayload) => {
    const { Id, user, meets } = payload;
    // console.log(meets.title);
    
    try {
      const res: AxiosResponse = await axios.post(
        'http://localhost:5001/api/meeting/create',
        {
         title:meets.title,
         create_user:user._id,
         date:meets.date,
          channel_Id: Id
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



export const getAllmeetings = createAsyncThunk(
  "/meeting/get",
  async () => {    
    try {
      
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/meeting/get`
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
export const getmeeting = createAsyncThunk(
  "/meeting/get",
  async (payload: GetPayload) => {    
    const { Id } = payload;
    
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:5001/api/meeting/get/`+Id,

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

export const updatemeeting = createAsyncThunk(
  "/api/meeting/update",
  
  async (payload: UpdatemeetingPayload) => {
    // console.log(payload);
    
    const { _id, period, meeting, title, create_user, invite_users, creaters } = payload;
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/meeting/update/`+_id,
        {
          title,
          create_user,
          invite_users,
          period,
          meeting,
          creaters
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
export const updatemeetings = createAsyncThunk(
  "/api/meeting/update",
  
  async (payload: UpdatemeetingPayload) => {
    // console.log(payload);
    
    const { _id, meeting } = payload;
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/meeting/update/`+_id,
        {
          title,
          create_user,
          invite_users,
          period,
          meeting,
          creaters
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
export const deletemeeting = createAsyncThunk(
  "/api/meeting/delete",
  async (payload: string) => {
    try {
      
      const res: AxiosResponse = await axios.put(
        `http://localhost:5001/api/meeting/delete`,
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

export const changemeetingStore = createAsyncThunk(
  "/api/meeting/changemeetingStore",
  async (payload: ChangemeetingStorePayload) => {
    const { storeID, id } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/meeting/changemeetingStore`,
        {
          storeID,
          id,
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

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    isLoading: false,
    meeting: null,
    meetings: null,
    error: "",
  } as meetingState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(createmeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createmeeting.fulfilled, (state, { payload }) => {
          state.meeting = payload.meeting;
        state.isLoading = false;
      })
      .addCase(createmeeting.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      // .addCase(getmeeting.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getmeeting.fulfilled, (state, { payload }) => {
      //     state.meeting = payload.meeting;
      //   state.isLoading = false;
      // })
      // .addCase(getmeeting.rejected, (state, { payload }) => {
      //   // state.error = payload?.message || "";
      //   state.isLoading = false;
      // })
      .addCase(getmeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmeeting.fulfilled, (state, { payload }) => {
        
        state.meetings = payload.meeting;
        state.isLoading = false;
      })
      .addCase(getmeeting.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      // .addCase(updatemeeting.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updatemeeting.fulfilled, (state, { payload }) => {
      //   state.error = payload?.message;
      //   state.isLoading = false;
      // })
      // .addCase(updatemeeting.rejected, (state, { payload }) => {
      //   // state.error = payload?.message || "";
      //   state.isLoading = false;
      // })
      .addCase(deletemeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletemeeting.fulfilled, (state, { payload }) => {
        state.meetings = payload.meetings;
        state.error = payload?.message;
        state.isLoading = false;
      })
      .addCase(deletemeeting.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      });
  },
});

export default meetingSlice.reducer;
