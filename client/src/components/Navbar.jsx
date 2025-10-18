"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Guitar,
  UserCircle,
  Package,
  Settings,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  const [tautan, setTautan] = useState("/"); // default fallback
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchTautan = async () => {
      try {
        const res = await api.get("/api/tautan");
        if (res.data?.data?.length > 0) {
          setTautan(res.data.data[0].tautan); // ambil tautan pertama dari DB
        }
      } catch (error) {
        console.error("Gagal ambil tautan:", error);
      }
    };
    fetchTautan();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const menuItems = [
    { href: "/", label: "Beranda" },
    { href: "/prestasi", label: "Prestasi" },
    { href: "/berita", label: "Berita" },
    { href: "/galeri", label: "Galeri" },
    { href: "/artikel", label: "Artikel" },
    { href: "/sejarah", label: "Sejarah" },
  ];

  return (
    <nav className="bg-gradient-to-br from-[#2c2c54] via-[#4b3672] to-[#6a4c93] border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="" className="flex items-center space-x-2">
            <School className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-white">
              SMAK N 1 Kebangsaan
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8">
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={
                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ` +
                            (isActive
                              ? "text-white underline underline-offset-4 font-semibold "
                              : "text-white hover:text-blue-600")
                          }
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>{" "}
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link href="/login"> */}
            <Link href={tautan}>
              <Button
                size="sm"
                className="flex bg-gradient-to-r from-blue-600 to-purple-600 items-center space-x-2"
              >
                <span>PPDB</span>
              </Button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ` +
                      (isActive
                        ? "bg-blue-100 text-blue-700 font-semibold shadow"
                        : "text-gray-600 hover:text-blue-600")
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t pt-4 mt-4 space-y-2"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
