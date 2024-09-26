import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import headerReducer from "./headerSlice";
import channelReducer from "./channelSlice";
import meetingReducer from "./meetingSlice";
import taskReducer from "./taskSlice";
import wekiReducer from "./wekiSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    header: headerReducer,
    meeting: meetingReducer,
    task: taskReducer,
    weki: wekiReducer,
  },
});

export default store;

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
