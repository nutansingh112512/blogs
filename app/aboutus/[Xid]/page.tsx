"use client";

import type { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function () {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!loggedin) {
      alert("Login to visit about Page.");
      router.push("/signin");
    }
  }, []);
  return <div></div>;
}
