import { ThemeToggle } from "../shared/theme-toggle";
import Image from "next/image";
import logo from "@/public/rick-and-morty.png";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-2 bg-green-900 shadow-md border-b-4 border-green-500">
      <div className="flex items-center">
        <Image src={logo} alt="Rick and Morty Logo" width={120} height={60} />
        <h1 className="text-xl font-bold text-green-300 drop-shadow-lg">Rick and Morty Portal</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}