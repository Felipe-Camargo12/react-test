import { ThemeToggle } from "../shared/theme-toggle";
import Image from "next/image";
import logo from "../../../public/rick-and-morty.png";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-green-900 shadow-md border-b-4 border-green-500">
      <div className="flex items-center lg:gap-4 ">
        <Image
          src={logo}
          alt="Rick and Morty Logo"
          width={120}
          height={120}
          className="sm:ml-0 -ml-8"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-lime-400 dark:text-lime-100 rick-and-morty-font animate-pulse drop-shadow-md">
          Rick and Morty Portal
        </h1>
      </div>

      <ThemeToggle />
    </header>
  );
}
