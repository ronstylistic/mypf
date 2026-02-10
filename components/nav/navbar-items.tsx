"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Patients", href: "/patients" },
  { label: "Admission", href: "/admission" },
  { label: "Secretary", href: "/secretary" },
  { label: "Settings", href: "/settings" }
];


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navLinkClass = (href: string) => {
  const isActive =
    pathname === href || pathname.startsWith(`${href}/`);

  return `
    relative transition-colors duration-200
    ${
      isActive
        ? "text-primary font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-primary"
        : "text-gray-700 hover:text-dark after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
    }
  `;
};


  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-9999 bg-white shadow-md border-b border-gray-100">
        <div className="mx-auto flex justify-between items-center py-4 px-6">
          {/* LOGO */}
          <Link
            href="/"
            className={"flex items-center gap-2 outline-none focus:outline-none focus:ring-0"}
          >
            {/* <Image
              src="/images/logo.png"
              width={32}
              height={32}
              alt="LumaRose Health & Wellness logo"
              priority
            /> */}
            <span className="font-semibold text-lg sm:text-2xl">
              <span className="hover:text-secondary transition-colors">
                MyPf Tracker
              </span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden gap-2 flex-wrap md:flex items-center md:gap-8 text-gray-700 font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

            <Button className="bg-primary text-white hover:bg-primary/80 px-5 uppercase">
              <Link href="/register">Get Started</Link>
            </Button>

          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU PANEL */}
      {open && (
        <div className="fixed top-18 inset-x-0 z-9998 bg-white border-b border-gray-100 shadow-lg md:hidden">
          <nav className="flex flex-col px-6 py-6 space-y-4 text-gray-700 font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <Button className="bg-primary text-white hover:bg-primary/80 uppercase w-full">
              <Link href="/register" onClick={() => setOpen(false)}>Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}