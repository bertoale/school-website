"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChevronUp,
  ChevronDown,
  MapPin,
  Calendar,
  ExternalLink,
  Building2,
  Gamepad2,
  Newspaper,
  Clock,
  Users,
} from "lucide-react";

export default function CardCarousel() {
  const [ekstrakurikulerList, setEkstrakurikulerList] = useState([]);
  const [fasilitasList, setFasilitasList] = useState([]);
  const [beritaList, setBeritaList] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

  const scrollContainerEkstra = useRef(null);
  const scrollContainerFasilitas = useRef(null);

  // --- Fetch data on mount ---
  useEffect(() => {
    fetchEkstrakurikuler();
    fetchFasilitas();
    fetchBerita();
  }, []);

  // --- Fetch functions ---
  const fetchEkstrakurikuler = async () => {
    try {
      const response = await api.get(`/api/ekstrakurikuler`, {
        withCredentials: true,
      });
      setEkstrakurikulerList(response.data.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data ekstrakurikuler:", err);
    }
  };

  const fetchFasilitas = async () => {
    try {
      const response = await api.get(`/api/fasilitas`, {
        withCredentials: true,
      });
      setFasilitasList(response.data.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data fasilitas:", err);
    }
  };

  const fetchBerita = async () => {
    try {
      const response = await api.get(`/api/berita`, {
        withCredentials: true,
      });
      setBeritaList(response.data.data.slice(0, 3));
    } catch (err) {
      console.error("❌ Gagal mengambil data berita:", err);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  return (
    <section className="py-4 h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-200/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Grid Layout - Desktop: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8 h-full">
          {/* Berita Section - Left column (spans 2 rows on desktop) */}
          <div className="lg:row-span-2 order-1 bg-green-50 rounded-2xl shadow-xl">
            <div className="h-full bg-green-50 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.25)]">
              <div className="text-center mb-0">
                <div className="pt-2 inline-flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold  bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    Berita Terbaru
                  </h2>
                </div>
              </div>{" "}
              {/* Desktop: Vertical Carousel, Mobile: Horizontal Carousel for Berita */}
              {/* Desktop Vertical Carousel */}
              <div className="hidden lg:block">
                <Carousel
                  orientation="vertical"
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="h-[600px] w-full"
                >
                  <CarouselContent className="-mt-4 h-[600px]">
                    {beritaList.map((item) => (
                      <CarouselItem key={item._id} className="p-4 basis-1/2">
                        <Card className="group  transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg h-full">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={`${apiUrl}/uploads/${item.gambar[0]}`}
                              alt={item.judul}
                              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Badge className="absolute top-4 left-4 bg-green-500/90 text-white border-0">
                              <Clock className="w-3 h-3 mr-1" />
                              Berita
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {formatDate(item.tanggal)}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-2 line-clamp-2">
                              {item.judul}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <Link href={`/berita/${item._id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300"
                              >
                                Baca Selengkapnya
                                <ExternalLink className="w-3 h-3 ml-2" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="mt-10" />

                  <CarouselNext className="mb-12" />
                </Carousel>
              </div>
              {/* Mobile Horizontal Carousel */}
              <div className="block lg:hidden">
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {beritaList.map((item) => (
                      <CarouselItem
                        key={item._id}
                        className="p-2 basis-full sm:basis-1/2"
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg h-full">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={`${apiUrl}/uploads/${item.gambar[0]}`}
                              alt={item.judul}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Badge className="absolute top-4 left-4 bg-green-500/90 text-white border-0">
                              <Clock className="w-3 h-3 mr-1" />
                              Berita
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {formatDate(item.tanggal)}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-2 line-clamp-2">
                              {item.judul}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <Link href={`/berita/${item._id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300"
                              >
                                Baca Selengkapnya
                                <ExternalLink className="w-3 h-3 ml-2" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                  <CarouselNext className="mr-12 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                </Carousel>
              </div>
            </div>
          </div>

          {/* Fasilitas Section - Top right */}
          <div className="order-2 lg:order-2 bg-blue-50 rounded-2xl shadow-xl">
            <div className="h-full bg-blue-50 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.25)]">
              <div className="text-center mb-0">
                <div className="pt-2 inline-flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    Fasilitas
                  </h2>
                </div>
              </div>

              {/* Horizontal Carousel for Fasilitas */}
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className=" px-2 -ml-2">
                  {fasilitasList.map((item) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-2 basis-1/2 lg:basis-1/3"
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md h-full">
                        <div className="relative overflow-hidden rounded-t-lg h-48">
                          <img
                            src={`${apiUrl}/uploads/${item.gambar}`}
                            alt={item.nama}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-2 left-2 bg-blue-500/90 text-white border-0 text-xs">
                            <MapPin className="w-2 h-2 mr-1" />
                            Fasilitas
                          </Badge>
                        </div>

                        <CardContent className="p-3">
                          <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {item.nama}
                          </h3>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className=" ml-8  lg:flex -left-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                <CarouselNext className=" mr-8 lg:flex -right-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
              </Carousel>
            </div>
          </div>

          {/* Ekstrakurikuler Section - Bottom right */}
          <div className="lg:col-start-2 order-3 bg-purple-50 rounded-2xl shadow-xl">
            <div className="h-full bg-purple-50 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.25)]">
              <div className="text-center mb-0">
                <div className="pt-2 inline-flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    Ekstrakurikuler
                  </h2>
                </div>
              </div>

              {/* Horizontal Carousel for Ekstrakurikuler */}
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="px-2 -ml-2">
                  {ekstrakurikulerList.map((item) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-2 basis-1/2 lg:basis-1/3"
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md h-full">
                        <div className="relative overflow-hidden rounded-t-lg h-48">
                          <img
                            src={`${apiUrl}/uploads/${item.gambar}`}
                            alt={item.nama}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-2 left-2 bg-blue-500/90 text-white border-0 text-xs">
                            <MapPin className="w-2 h-2 mr-1" />
                            Eskul
                          </Badge>
                        </div>

                        <CardContent className="p-3">
                          <h3 className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                            {item.nama}
                          </h3>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className=" ml-8 lg:flex -left-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
                <CarouselNext className=" mr-8 lg:flex -right-6 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
