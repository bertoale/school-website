"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import api from "@/lib/axios";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function DetailBerita({ params }) {
  const { id } = React.use(params);
  const [berita, setBerita] = useState({});
  const [gambarDipilih, setGambarDipilih] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainer = useRef(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await api.get(`/api/berita/${id}`);
        setBerita(res.data.data || {});
      } catch (err) {
        console.error("❌ Gagal mengambil detail berita:", err);
      }
    };
    fetchBerita();
  }, [id, apiUrl]);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainer.current) {
        setIsOverflowing(
          scrollContainer.current.scrollWidth >
            scrollContainer.current.clientWidth
        );
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [berita]);

  const scrollLeft = () => {
    scrollContainer.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollContainer.current.scrollLeft += 300;
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "Tanggal tidak tersedia";
    return new Date(tanggal).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDeskripsi = (text) => {
    if (!text) return "";
    return text.replace(/<br\s*\/?>/gi, "\n");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Modal Gambar */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="hidden"></DialogTitle>
          <div className="flex justify-center items-center">
            <Image
              src={gambarDipilih} // ⬅️ tidak perlu tambah fileUrl lagi
              alt="Gambar besar"
              width={800}
              height={500}
              className="rounded-lg object-contain max-h-[80vh]"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Kartu Berita */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          {/* Judul */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">
            {berita.judul || "Judul tidak tersedia"}
          </h2>
          <p className="text-center text-gray-500 mb-6 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatTanggal(berita.tanggal)}
          </p>

          {/* Slider Gambar */}
          {berita.gambar && berita.gambar.length > 0 ? (
            <div className="relative mb-6">
              {isOverflowing && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}

              <div
                ref={scrollContainer}
                className={`flex overflow-x-auto gap-4 px-4 pb-2 scroll-smooth ${
                  isOverflowing ? "justify-start" : "justify-center"
                }`}
              >
                {berita.gambar.map((img, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[250px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden shadow hover:scale-105 transition"
                    onClick={() => {
                      setGambarDipilih(`${fileUrl}/uploads/${img}`);
                      setShowModal(true);
                    }}
                  >
                    <Image
                      src={`${fileUrl}/uploads/${img}`}
                      alt={`Gambar ${index + 1}`}
                      width={250}
                      height={200}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-300 text-gray-700 rounded-lg h-[300px] mb-6">
              <strong>Tidak ada gambar</strong>
            </div>
          )}

          {/* Deskripsi */}
          {berita.deskripsi ? (
            <p
              className="text-gray-700 whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatDeskripsi(berita.deskripsi),
              }}
            />
          ) : (
            <p className="text-gray-500">Deskripsi tidak tersedia.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
