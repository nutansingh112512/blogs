"use client";

import { GoHome, GoCreditCard, GoListUnordered } from "react-icons/go";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateLogin } from "../store";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedin);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(updateLogin(""));
    setIsOpen(false);
    router.replace("/signin");
  };

  return (
    <div className="px-3 pt-3 fixed">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`lg:hidden cursor-pointer hover:bg-gray-200 p-2 rounded-md`}
        >
          <GoListUnordered size={20} />
        </button>
      )}
      <div
        className={`fixed top-0 lg:left-0 ${
          isOpen ? "left-0" : "-left-full"
        } transition-all duration-300 ease-in-out bg-white min-h-screen px-5 lg:pt-10 pt-5 flex flex-col items-center border-r-2 border-[#9ca0af]`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden cursor-pointer hover:bg-gray-200 p-2 rounded-md self-end"
        >
          <MdClose size={20} />
        </button>
        <ul className="flex flex-col items-start gap-3">
          <li>
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-md"
            >
              <GoHome size={20} /> Home{" "}
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link
                href="/aboutus"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-md"
              >
                <GoCreditCard size={20} /> About
              </Link>
            ) : (
              <button
                onClick={() => {
                  alert("Login to visit about Page.");
                }}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-md"
              >
                <GoCreditCard size={20} /> About
              </button>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-md"
              >
                <AiOutlineLogout size={20} /> Logout
              </button>
            ) : (
              <Link
                href="/signin"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineLogin size={20} /> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
