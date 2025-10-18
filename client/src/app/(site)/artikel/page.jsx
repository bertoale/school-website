"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-green-600 text-white text-center py-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-0">
              Mari Kembangkan Karakter Disiplin, Jujur, Terampil, dan Mandiri
              dari Remaja dengan Menyenangkan
            </h3>
          </CardHeader>

          <CardContent className="prose max-w-none text-gray-700 text-justify py-6 px-4 sm:px-6">
            <p>
              Hai <strong>sobat santano</strong>, khususnya adik-adik{" "}
              <strong>SMP Kelas IX</strong> dimanapun kalian berada 😊,
              <strong> SMAK Thomas Aquino</strong> siap membantu kalian semua
              untuk mengembangkan diri dan meraih cita-cita dengan cara yang
              menyenangkan, penuh keakraban, dan dalam suasana kekeluargaan.
            </p>

            <Alert className="bg-blue-50 border-blue-200 text-blue-700 my-4">
              <AlertDescription>
                Setiap tahun banyak siswa SMP Kelas IX bingung memilih sekolah.
                Mungkin kalian juga merasakannya, bukan?
              </AlertDescription>
            </Alert>

            <ul className="list-disc pl-5 space-y-1">
              <li>
                Ingin didampingi secara maksimal oleh guru-guru yang peduli?
              </li>
              <li>Ingin mengembangkan potensi diri (softskill & hardskill)?</li>
              <li>Ingin mendapatkan bimbingan konseling ke jenjang kuliah?</li>
              <li>Ingin sekolah dengan suasana kekeluargaan?</li>
            </ul>

            <p className="mt-4">
              Tenang, SMAK Thomas Aquino adalah tempat yang tepat untuk kalian.
              Di sini kalian bisa:
            </p>

            <ul className="list-disc pl-5 space-y-1">
              <li>
                Belajar akademik dan non-akademik dengan suasana menyenangkan
              </li>
              <li>Bertemu teman dari berbagai daerah</li>
              <li>
                Mengembangkan potensi di bidang seni, olahraga, dan organisasi
              </li>
            </ul>

            <h5 className="font-semibold mt-6">
              Ekstrakurikuler yang Bisa Kamu Ikuti:
            </h5>
            <div className="flex flex-wrap gap-2 my-2">
              {[
                "Club Bahasa",
                "Teater",
                "Modern Dance",
                "Tata Rias",
                "Basket",
                "Sepak Bola",
                "Memasak",
                "Pramuka",
              ].map((ekskul) => (
                <Badge
                  key={ekskul}
                  variant="secondary"
                  className="bg-gray-300 text-gray-800"
                >
                  {ekskul}
                </Badge>
              ))}
              <span className="text-sm">dan banyak lagi!</span>
            </div>

            <h5 className="font-semibold mt-6">
              Program Unggulan SMAK Thomas Aquino:
            </h5>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Saint Thomas In Action <strong>(STIA)</strong>
              </li>
              <li>
                Thomas Aquino Cup <strong>(TAC)</strong>
              </li>
              <li>
                Pendidikan Karakter:{" "}
                <strong>Disiplin, Jujur, Terampil, dan Mandiri</strong>
              </li>
            </ul>

            <h5 className="font-semibold mt-6">Prestasi Siswa Kami:</h5>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 mb-4">
              {[
                "🏆 FLS2N – Lolos Nasional bidang Cipta Lagu",
                "🏆 Lomba News Presenter – Juara 3 (UNDIKNAS Denpasar)",
                "🏆 Lomba Video Kreatif “Rayakan Merdekamu” – Kemendikbud RI",
                "🏆 Lomba Matematika “UNMAS Mathematics Competition”",
                "🏆 Vlog “Monumen Perjuangan Rakyat Bali” – Bajrasandhi",
                "🏆 Ajang Karya Empat Pilar MPR RI – Lolos 50 besar nasional",
                "🏆 Lomba Bahasa Jepang De’Jafu – Universitas Udayana",
              ].map((prestasi, i) => (
                <li key={i} className="px-4 py-2 text-gray-700">
                  {prestasi}
                </li>
              ))}
            </ul>

            <Alert className="bg-green-50 border-green-200 text-green-700 my-4">
              <AlertDescription>
                SMAK Thomas Aquino telah <strong>terakreditasi A</strong> dan
                menyediakan <strong>fasilitas lengkap</strong> untuk menunjang
                pembelajaran.
              </AlertDescription>
            </Alert>

            <p>
              Banyak alumni kami sukses masuk ke universitas ternama dan
              berprestasi di berbagai bidang.
              <a
                href="https://www.youtube.com/watch?v=kl50prrwOzE"
                target="_blank"
                className="text-red-600 hover:underline font-semibold ml-2"
              >
                🎥 Lihat Testimoni Alumni
              </a>
            </p>

            <div className="text-center my-6">
              <Link href="/pendaftaran-form">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md">
                  DAFTAR SEKARANG
                </Button>
              </Link>
            </div>

            <p className="mb-1">
              <strong>Contact Person:</strong> Pak Yosep (0812 4648 8060)
            </p>

            <h6 className="mt-4 font-semibold">
              Media Sosial SMAK Thomas Aquino:
            </h6>
            <ul className="list-none space-y-1">
              <li>
                📷 Instagram:{" "}
                <a
                  href="https://instagram.com/smakthomasaquino"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  @smakthomasaquino
                </a>{" "}
                &{" "}
                <a
                  href="https://instagram.com/santanosis"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  @santanosis
                </a>
              </li>
              <li>
                📘 Facebook:{" "}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Smas Katolik Thomas Aquino
                </a>
              </li>
              <li>
                📺 YouTube:{" "}
                <a
                  href="https://www.youtube.com/channel/UCMvDVphhNDfU4DdKfYSLzVw"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  SMAK Thomas Aquino
                </a>
              </li>
              <li>
                📝 Blog:{" "}
                <a
                  href="https://smakthomasaquino.wordpress.com/"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  smakthomasaquino.wordpress.com
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
