"use client";

import { type AboutData, AboutDatas } from "@/app/aboutus/aboutusData";
import type { RootState } from "@/app/store";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Zidpage() {
  const { loggedin } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!loggedin) {
      router.push("/signin");
      alert("Login to visit about Page.");
    }
  }, []);
  const ids = usePathname().split("/");
  const [Xid, Yid, Zid] = ids.slice(2);

  const { options } = AboutDatas as AboutData;

  const Zoptions = options
    .find((opt) => String(opt.id) === Xid)
    ?.info.find((opt) => opt.id === Yid)
    ?.detail.find((opt) => opt.id === Zid);
  if (!Zoptions) redirect(`/aboutus/${Xid}/${Yid}`);
  return (
    <div className="flex flex-col justify-center items-center">
      <h3>Details</h3>
      <p>
        {Xid} | {Yid} | {Zid}
      </p>
    </div>
  );
}
