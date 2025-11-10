"use client";

import type { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function YidPage() {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!loggedin) {
      router.push("/signin");
      alert("Login to visit about Page.");
    }
  }, []);
  return <div className=""></div>;
}
