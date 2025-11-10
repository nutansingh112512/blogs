import { createSlice } from "@reduxjs/toolkit";
import type { Blog } from "@/app/components/BlogCard";

const initialState: Blog[] = [
  {
    username: "bradpit",
    id: 1,
    date: new Date(
      "Sat Nov 01 2025 10:38:09 GMT+0530 (India Standard Time)"
    ).toISOString(),
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    username: "johndoe",
    id: 2,
    date: new Date(
      "Tue Nov 04 2025 10:38:09 GMT+0530 (India Standard Time)"
    ).toISOString(),
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    username: "bradpit",
    id: 3,
    date: new Date(
      "Sun Nov 02 2025 10:38:09 GMT+0530 (India Standard Time)"
    ).toISOString(),
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    username: "janedoe",
    id: 4,
    date: new Date(
      "Wed Nov 05 2025 10:38:09 GMT+0530 (India Standard Time)"
    ).toISOString(),
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      return [action.payload, ...state];
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    editBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) return action.payload;
        return blog;
      });
    },
    resetBlog(state, action) {
      return initialState;
    },
  },
});

export const { addBlog, deleteBlog, editBlog, resetBlog } = blogsSlice.actions;
export const blogsReducer = blogsSlice.reducer;
