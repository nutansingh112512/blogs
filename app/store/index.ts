import { configureStore } from "@reduxjs/toolkit";
import { userReducer, updateLogin } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import {
  blogsReducer,
  addBlog,
  deleteBlog,
  editBlog,
  resetBlog,
} from "./slices/blogsSlice";

const persistConfig = { key: "root", version: 1, storage };
const rootReducer = combineReducers({
  user: userReducer,
  blogs: blogsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REJECT",
        ],
      },
    }),
});

export { store, updateLogin, addBlog, deleteBlog, editBlog, resetBlog };
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const persistor = persistStore(store);
