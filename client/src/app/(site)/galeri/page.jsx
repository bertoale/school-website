"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function GaleriPage() {
  const [dataGaleri, setDataGaleri] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileURL = process.env.NEXT_PUBLIC_FILE_URL;

  useEffect(() => {
    const getGaleri = async () => {
      try {
        const res = await api.get(`/api/galeri`);
        setDataGaleri(res.data.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data galeri:", err);
      }
    };
    getGaleri();
  }, [apiUrl]);

  return (
    <main className="py-8 px-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Galeri
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {dataGaleri.map((galeri, index) => (
          <div key={galeri._id || index} className="break-inside-avoid">
            <Card className="group relative overflow-hidden rounded-lg border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                {galeri.gambar && (
                  <img
                    src={`${fileURL}/uploads/${galeri.gambar}`}
                    alt={galeri.judul}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <Badge className="absolute top-2 left-2 bg-blue-500/90 text-white border-0 text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  Galeri
                </Badge>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold px-4 text-center">
                    {galeri.judul}
                  </span>
                </div>
              </div>

              <CardContent className="p-3">
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {galeri.judul}
                </h3>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
