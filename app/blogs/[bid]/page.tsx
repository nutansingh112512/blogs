"use client";

import { deleteBlog, editBlog, RootState } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

export default function Blog() {
  const pathname = usePathname();
  const router = useRouter();
  const bid = pathname.split("/").pop();
  const blog = useSelector((state: RootState) =>
    state.blogs.find((b) => String(b.id) === bid)
  );
  const { username } = useSelector((state: RootState) => state.user);

  const dateObj = blog ? new Date(blog.date) : null;
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newBlog, setNewBlog] = useState<{
    title: string | undefined;
    body: string | undefined;
  }>({
    title: blog?.title,
    body: blog?.body,
  });
  const dispatch = useDispatch();

  const handleDeleteBlog = () => {
    // will dispatch a delete action
    dispatch(deleteBlog(blog?.id));
    router.replace("/blogs");
  };
  const handleEditBlog = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      editBlog({
        username: username,
        date: new Date().toISOString(),
        id: blog?.id,
        title: newBlog.title,
        body: newBlog.body,
      })
    );
    setEditMode(false);
  };
  useEffect(() => {
    setIsCurrentUser(username === blog?.username);
  }, [username, blog?.username]);
  return (
    <div className="flex flex-col min-h-screen items-center justify-start gap-5 pt-10 px-3 ">
      <h1 className="text-2xl font-bold">Blog {bid}</h1>
      <div className="max-w-xl w-full flex flex-col gap-5 lg:p-5 p-3 bg-gray-200 rounded-2xl shadow-md ">
        <div className="flex items-center justify-between text-sm italic font-medium">
          <p>@{blog?.username}</p>
          <p>
            {dateObj
              ? `${dateObj.getDate()}/${
                  dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`
              : "N/A"}
          </p>
        </div>
        {!editMode && (
          <>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-lg">{blog?.title}</p>
              <p>{blog?.body}</p>
            </div>
            <div className="flex gap-3 self-end">
              <button
                onClick={isCurrentUser ? handleDeleteBlog : () => {}}
                className={`${
                  isCurrentUser
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-gray-300 text-gray-400"
                } cursor-pointer flex flex-nowrap  items-center p-2 rounded-lg  not-italic`}
              >
                <GoTrash size={15} /> Delete
              </button>
              <button
                onClick={
                  isCurrentUser
                    ? () => {
                        setEditMode(true);
                      }
                    : () => {}
                }
                className={`${
                  isCurrentUser
                    ? "bg-gray-300 hover:bg-white"
                    : "bg-gray-300 text-gray-400"
                } cursor-pointer flex  items-center flex-nowrap p-2 rounded-lg  not-italic`}
              >
                <GoPencil size={15} /> Edit
              </button>
            </div>
          </>
        )}
        {editMode && (
          <form
            onSubmit={
              blog?.title === newBlog.title && blog?.body === newBlog.body
                ? (e) => {
                    e.preventDefault();
                  }
                : handleEditBlog
            }
            className="flex flex-col gap-3"
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
              rows={5}
              value={newBlog.body}
              onChange={(e) =>
                setNewBlog((v) => ({ ...v, body: e.target.value }))
              }
            />
            <div className="flex self-end gap-3">
              <button
                onClick={() => {
                  setNewBlog((v) => ({ title: blog?.title, body: blog?.body }));
                  setEditMode(false);
                }}
                className={`${"bg-gray-300 hover:bg-white"} cursor-pointer flex  items-center flex-nowrap p-2 rounded-lg  not-italic`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${
                  blog?.title === newBlog.title && blog?.body === newBlog.body
                    ? "bg-gray-300 text-gray-400"
                    : "bg-gray-300 hover:bg-white"
                } cursor-pointer flex  items-center flex-nowrap p-2 rounded-lg  not-italic`}
              >
                Done
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
