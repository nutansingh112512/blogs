"use client";
import { usePathname, useRouter } from "next/navigation";
import type { OptionType } from "../aboutus/aboutusData";

export default function Options({
  opt,
  path,
}: {
  opt: OptionType;
  path: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleOptionClick = () => {
    router.push(path);
  };
  return (
    <div
      className={`${
        pathname.includes(path) ? "bg-gray-400" : "bg-gray-200"
      } bg-gray-200 py-3 px-20 rounded-2xl cursor-pointer hover:bg-gray-300`}
      key={opt.id}
      onClick={handleOptionClick}
    >
      {opt.name}
    </div>
  );
}
