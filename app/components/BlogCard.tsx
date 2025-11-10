"use client";

import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, RootState } from "../store";
import { useRouter } from "next/navigation";

export type Blog = {
  username: string;
  date: string;
  id: number;
  title: string;
  body: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const username = useSelector((state: RootState) => state.user.username);
  const dateObj = new Date(blog.date);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteBlog = () => {
    // will dispatch a delete action
    dispatch(deleteBlog(blog.id));
  };
  const handleBlogOpen = () => {
    router.push(`blogs/${blog.id}`);
  };

  useEffect(() => {
    setIsCurrentUser(username === blog.username);
  }, [username, blog.username]);
  return (
    <div className="flex flex-col gap-3 bg-gray-200 p-3 rounded-2xl shadow-md">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-3 text-xs italic">
          <p>@{blog.username}</p>
          <p>
            {dateObj.getDate()}/{dateObj.getMonth() + 1}/{dateObj.getFullYear()}
          </p>
        </div>
        {isCurrentUser && (
          <button
            onClick={handleDeleteBlog}
            className="cursor-pointer flex  items-center p-2 rounded-lg bg-red-500 hover:bg-red-400 text-white not-italic"
          >
            <GoTrash size={10} /> Delete
          </button>
        )}
      </div>
      <div
        onClick={handleBlogOpen}
        className="flex flex-col gap-1 hover:text-gray-500 cursor-pointer"
      >
        <p className="font-bold uppercase">{blog.title}</p>
        <p>{blog.body}</p>
      </div>
    </div>
  );
}
