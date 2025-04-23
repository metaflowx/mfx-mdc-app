"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { NavbarList } from "./navbar";

const MobileMenuDashboard = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="xl:hidden">
        <Button variant="ghost" size="icon" className="xl:hidden">
          <Menu style={{height:"35px",width:"35px"}} color="#fff" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[300px] pt-12">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-4">
          {NavbarList?.map((link, index) => (
            <SheetTrigger asChild  key={link?.id}>
              <Link
                key={link?.id}
                href={link?.Url}
                className="text-base text-white font-medium transition-colors hover:text-primary"
              >
                {link?.Name}
              </Link>
            </SheetTrigger>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuDashboard;
