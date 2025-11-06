"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Users,
  Trophy,
  Drama,
  Building2,
  Newspaper,
  Megaphone,
  Images,
} from "lucide-react";

export default function DashboardSummary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary();
  }, []);

  const getDashboardSummary = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.get(`${url}/api/adminAuth/dashboard-summary`, {
        withCredentials: true,
      });

      const data = res.data;
      setSummary([
        {
          title: "Data Pendaftaran",
          value: data.totalPendaftaran,
          icon: <Users className="text-blue-500 w-10 h-10" />,
          color: "bg-blue-50",
        },
        {
          title: "Data Prestasi",
          value: data.totalPrestasi,
          icon: <Trophy className="text-amber-500 w-10 h-10" />,
          color: "bg-amber-50",
        },
        {
          title: "Data Ekstrakurikuler",
          value: data.totalEkskul,
          icon: <Drama className="text-purple-500 w-10 h-10" />,
          color: "bg-purple-50",
        },
        {
          title: "Data Fasilitas",
          value: data.totalFasilitas,
          icon: <Building2 className="text-green-600 w-10 h-10" />,
          color: "bg-green-50",
        },
        {
          title: "Data Berita",
          value: data.totalBerita,
          icon: <Newspaper className="text-cyan-500 w-10 h-10" />,
          color: "bg-cyan-50",
        },
        {
          title: "Data Pengumuman",
          value: data.totalPengumuman,
          icon: <Megaphone className="text-orange-500 w-10 h-10" />,
          color: "bg-orange-50",
        },
        {
          title: "Data Galeri",
          value: data.totalGaleri,
          icon: <Images className="text-pink-500 w-10 h-10" />,
          color: "bg-pink-50",
        },
      ]);
    } catch (err) {
      console.error("❌ Gagal memuat data dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {summary.map((item) => (
            <Card
              key={item.title}
              className="p-4 border bg-white/60 backdrop-blur-md hover:shadow-lg transition"
            >
              <CardContent className="flex items-center gap-4 p-0">
                <div
                  className={`flex items-center justify-center rounded-xl p-3 ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
