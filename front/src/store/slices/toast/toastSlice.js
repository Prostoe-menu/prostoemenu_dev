import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';

const initialState = {
  notifications: [
    { id: 1, message: 'hello' },
    { id: 2, message: 'bye' },
    { id: 3, message: 'welcome' },
  ],
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
