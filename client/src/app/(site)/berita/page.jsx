"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

// Fungsi bantu untuk hapus HTML dan potong teks
const stripHtml = (html) => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const truncate = (text, length = 300) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const formatTanggal = (tanggal) => {
  if (!tanggal) return "Tanggal tidak tersedia";
  return new Date(tanggal).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  });
};

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await api.get(`/api/berita`, {
          withCredentials: true,
        });
        setBeritaList(response.data.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data berita:", error);
      }
    };

    fetchBerita();
  }, [apiUrl]);

  return (
    <main className="py-10 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {beritaList.map((berita, index) => (
          <Card
            key={index}
            className="shadow-lg border-0 bg-[#f4fcfa]/80 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          >
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Gambar */}
                {berita.gambar && berita.gambar.length > 0 ? (
                  <img
                    src={`${fileUrl}/uploads/${berita.gambar[0]}`}
                    alt={berita.judul}
                    className="w-full max-h-[400px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-300 text-gray-700 rounded-lg h-[300px]">
                    <strong>Tidak ada gambar</strong>
                  </div>
                )}

                {/* Konten */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-700 transition-colors">
                    <Link href={`/berita/${berita._id}`}>{berita.judul}</Link>
                  </h3>

                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {berita.tanggal
                      ? formatTanggal(berita.tanggal)
                      : "Tanggal tidak tersedia"}
                  </p>

                  <p className="text-gray-700">
                    {truncate(stripHtml(berita.deskripsi), 300)}
                  </p>

                  <Link href={`/berita/${berita._id}`}>
                    <Button
                      variant="outline"
                      className="mt-4 border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      Baca Selengkapnya
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
