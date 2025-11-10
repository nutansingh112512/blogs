"use client";

import type { RootState } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AboutUs() {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!loggedin) {
      router.push("/signin");
      alert("Login to visit about Page.");
    }
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center w-full"></div>
  );
}
