import { redirect } from "next/navigation";
import { AboutDatas } from "./aboutusData";
import type { AboutData } from "./aboutusData";
import Options from "../components/Options";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { options } = AboutDatas as AboutData;

  return (
    <div className="flex flex-col min-h-screen items-center justify-start gap-5 pt-10 px-3 lg:ml-10">
      <h1 className="text-2xl font-bold">About</h1>
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <Options key={opt.id} path={`/aboutus/${opt.id}`} opt={opt} />
          ))}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
