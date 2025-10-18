"use client";
import {
  ArrowBigRight,
  BookText,
  Boxes,
  Calendar,
  Guitar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingCart,
  Medal,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Pendaftaran",
    url: "/admin/pendaftaran",
    icon: BookText,
  },
  {
    title: "Berita",
    url: "/admin/berita",
    icon: Boxes,
  },
  {
    title: "Prestasi",
    url: "/admin/prestasi",
    icon: Medal,
  },

  {
    title: "Fasilitas",
    url: "/admin/fasilitas",
    icon: Inbox,
  },
  {
    title: "Ekstrakurikuler",
    url: "/admin/ekstrakurikuler",
    icon: Inbox,
  },
  {
    title: "Galeri",
    url: "/admin/galeri",
    icon: Inbox,
  },
  {
    title: "Pengumuman",
    url: "/admin/pengumuman",
    icon: Inbox,
  },
  {
    title: "Tautan PPDB",
    url: "/admin/tautan",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    // redirect to homepage after logout
    window.location.href = "/";
  };

  return (
    <div className="">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Nexpress Shop</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    pathname?.startsWith(item.url + "/");
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={
                            `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 ` +
                            (isActive
                              ? "text-teal-700 bg-teal-50 font-medium"
                              : "text-gray-700 hover:text-teal-700 hover:bg-gray-50")
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 justify-start text-red-600 border-red-200 hover:bg-red-50"
              >
                <span>Logout</span>
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
