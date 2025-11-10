import { redirect } from "next/navigation";

export default function Home() {
  redirect("/blogs");
  return (
    <div className="flex min-h-screen items-center justify-center font-sans w-full"></div>
  );
}
