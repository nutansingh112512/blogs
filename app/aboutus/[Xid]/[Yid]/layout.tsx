import Options from "@/app/components/Options";
import { AboutDatas } from "../../aboutusData";
import type { AboutData } from "../../aboutusData";
import { redirect } from "next/navigation";

export default async function YidLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { Xid: string; Yid: string };
}>) {
  const { options } = AboutDatas as AboutData;
  const { Xid, Yid } = await params;
  const Yoptions = options
    .find((opt) => String(opt.id) === Xid)
    ?.info.find((opt) => opt.id === Yid)?.detail;

  if (!Yoptions) redirect(`/aboutus/${Xid}`);

  return (
    <div className="flex lg:flex-row flex-col gap-5 ">
      <div className="flex flex-col gap-3">
        {Yoptions?.map((opt) => (
          <Options
            key={opt.id}
            path={`/aboutus/${Xid}/${Yid}/${opt.id}`}
            opt={opt}
          />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
