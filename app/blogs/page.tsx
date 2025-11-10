"use client";

import { FormEvent, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, resetBlog, RootState } from "../store";
import Weekly from "../components/Weekly";
import Filter from "../components/Filter";

export default function Blogs() {
  const [newBlog, setNewBlog] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });
  const [filter, setFilter] = useState<number>(-1);
  const dispatch = useDispatch();
  const { username, loggedin } = useSelector((state: RootState) => state.user);
  const blogs = useSelector((state: RootState) => state.blogs);
  const filteredBlogs = blogs.filter(
    (blog) => filter === -1 || new Date(blog.date).getDay() === filter
  );

  const handleAddBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!loggedin) {
      alert("Login to create a blog.");
      return;
    }
    if (!newBlog.title) alert("Enter the title.");
    else if (!newBlog.body) alert("Enter the description.");
    else {
      dispatch(
        addBlog({
          username: username,
          date: new Date().toISOString(),
          id: blogs.length + 1,
          title: newBlog.title,
          body: newBlog.body,
        })
      );
      setNewBlog({ title: "", body: "" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start gap-5 pt-10 px-3 lg:ml-10">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="flex gap-5">
        <div className="max-w-xl lg:w-xl w-full min-w-74 shrink-0 flex flex-col gap-5 ">
          <div className="bg-gray-200 p-3 rounded-2xl shadow-md w-full shrink-0">
            <form
              onSubmit={handleAddBlog}
              className="flex flex-col gap-3 w-full shrink-0"
            >
              <input
                type="text"
                className="rounded-2xl outline-none px-3 py-2 bg-white focus:shadow-green-900 focus:shadow-sm"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog((v) => ({ ...v, title: e.target.value }))
                }
              />
              <textarea
                className="rounded-2xl outline-none px-3 py-2 bg-white focus:shadow-green-900 focus:shadow-sm"
                placeholder="Description"
                value={newBlog.body}
                onChange={(e) =>
                  setNewBlog((v) => ({ ...v, body: e.target.value }))
                }
              />
              <button
                type="submit"
                className="cursor-pointer bg-black px-3 py-2 rounded-2xl text-white"
              >
                Create Blog
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center">
            <Filter setFilter={setFilter} />
            <button
              onClick={() => dispatch(resetBlog("reset"))}
              className={`bg-gray-300 hover:bg-gray-200 cursor-pointer flex  items-center flex-nowrap p-2 rounded-lg`}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {
              /* the blogs list starts here. */
              filteredBlogs.length ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-5">No blogs</p>
              )
            }
          </div>
        </div>
        <div className="hidden lg:block">
          <Weekly blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
