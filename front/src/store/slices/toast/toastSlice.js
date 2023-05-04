import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';

//   notification schema
//   {id: number, message:string}

const initialState = {
  notifications: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const updatedNotifications = [...state.notifications];
      if (updatedNotifications.length > 2) {
        updatedNotifications.shift();
      }
      updatedNotifications.push({
        id: uuidV4(),
        message: action.payload,
      });
      state.notifications = updatedNotifications;
    },
    deleteNotification: (state, action) => {
      const filteredNotifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );

      state.notifications = filteredNotifications;
    },
  },
});

export const { addNotification, deleteNotification } = toastSlice.actions;
export default toastSlice.reducer;