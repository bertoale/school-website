"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PengumumanDialog() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [pengumumanList, setPengumumanList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  // 🔹 Ambil data pengumuman dari API
  const fetchPengumuman = async () => {
    try {
      const response = await api.get(`/api/pengumuman`, {
        withCredentials: true,
      });

      const data = response.data.data;
      setPengumumanList(data);

      if (data.length > 0) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("❌ Gagal mengambil data pengumuman:", error);
    }
  };

  useEffect(() => {
    fetchPengumuman();
  }, []);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="
        w-[95vw] 
        max-w-[50vw]
        max-h-[100vh] 
        bg-white/95 
        backdrop-blur-md 
        border-0 
        shadow-2xl 
        p-4 
        overflow-hidden 
        flex 
        flex-col
      "
      >
        {/* Header */}
        <DialogHeader className="">
          <DialogTitle className="text-xl md:text-2xl font-bold text-purple-700">
            📢 Pengumuman
          </DialogTitle>
        </DialogHeader>

        {/* Isi Konten */}
        {pengumumanList.length > 0 ? (
          <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-lg">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {pengumumanList.map((item, index) => (
                  <CarouselItem
                    key={item.id || index}
                    className="flex justify-center items-center"
                  >
                    <img
                      src={`${apiUrl}/uploads/${item.gambar}`}
                      alt={`Pengumuman ${index + 1}`}
                      className="
                      max-h-[85vh] 
                      w-auto 
                      object-contain 
                      rounded-lg 
                      mx-auto
                    "
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/80 hover:bg-white shadow-lg border-0" />
              <CarouselNext className="right-2 bg-white/80 hover:bg-white shadow-lg border-0" />
            </Carousel>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            Tidak ada pengumuman saat ini.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
