"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateLogin } from "../store";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const dummyUsers: Record<string, string> = {
    bradpit: "brad123",
    johndoe: "john123",
    janedoe: "jane123",
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loggedin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(dummyUsers).includes(username)) {
      if (dummyUsers[username] === password) {
        dispatch(updateLogin(username));
        setPassword("");
        setUsername("");
        router.replace("/blogs");
      } else {
        alert("Incorrect Password!");
        setPassword("");
      }
    } else {
      alert("Invalid Username!");
    }
  };

  useEffect(() => {
    if (loggedin) router.replace("/blogs");
  }, [loggedin]);
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center px-5 pt-10 w-full">
      <h1 className="text-2xl font-bold">Log In</h1>
      <div className="max-w-md w-full rounded-3xl shadow-2xl bg-gray-200 lg:p-10 p-5">
        <form onSubmit={handleAuthentication} className="flex flex-col gap-2 ">
          <label htmlFor="username" className="text-lg font-medium">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white px-3 py-1 rounded-2xl outline-none focus:shadow-green-900 focus:shadow-sm"
          />
          <label htmlFor="password" className="text-lg font-medium pt-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white px-3 py-1 rounded-2xl outline-none focus:shadow-green-900 focus:shadow-sm"
          />
          <button
            type="submit"
            className="bg-black px-3 py-1 mt-5 rounded-2xl text-white"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
