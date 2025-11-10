import Options from "@/app/components/Options";
import { AboutDatas } from "../aboutusData";
import type { AboutData } from "../aboutusData";
import { redirect } from "next/navigation";

export default async function XidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ Xid: string }> }>) {
  const { options } = AboutDatas as AboutData;
  const { Xid } = await params;
  const Xoptions = options.find((opt) => String(opt.id) === Xid)?.info;
  if (!Xoptions) redirect("/aboutus");

  return (
    <div className="flex lg:flex-row flex-col gap-5 ">
      <div className="flex flex-col gap-3">
        {Xoptions?.map((opt) => (
          <Options key={opt.id} path={`/aboutus/${Xid}/${opt.id}`} opt={opt} />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
