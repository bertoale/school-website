"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SejarahPage() {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-blue-600 text-white text-center py-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-0">
              Sejarah Singkat SMAK Thomas Aquino
            </h2>
          </CardHeader>

          <CardContent className="prose max-w-none text-gray-800 text-justify py-6 px-4 sm:px-6 leading-relaxed">
            <p>
              SMAK Swastiastu Tangeb didirikan Tahun Ajaran 1981/1982 oleh Ketua
              Yayasan Swastiastu Pusat{" "}
              <strong>Drs. Piet Nyoman Giri, Pr.</strong> Dengan surat
              tertanggal 28 Maret 1981 nomor 901/D/UM/A/YS/1981 dan dengan surat
              pemberitahuan kepada Bapak Kepala Kantor Wilayah Departemen P dan
              K Prop. Bali tanggal 25 April 1981 nomor 128/III/Pend/g/YS/1981.
              Tetapi untuk tahun ajaran 1981/1982 Kepala Kanwil Dep P dan K
              Prop. Bali, <strong>Drs I Gst Agung Gede Oka</strong>, belum dapat
              menyetujui, dengan dikeluarkannya surat pemberitahuan tertanggal
              27 Mei 1981 Nomor: 198/I.la.81, dengan alasan:
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Di Kecamatan Mengwi sudah ada SMA Negeri dan 2 buah SMA Swasta
                yang masih cukup dapat menampung tamatan SMP di Kecamatan Mengwi
                yang berkeinginan melanjutkan ke SMA.
              </li>
              <li>
                Kedua buah SMA Swasta yang ada (SMA PGRI Mengwi dan SMA
                Wasundari Mengwi) relatif masih lemah.
              </li>
              <li>
                Di desa Untal-Untal Kec. Mengwi, pernah ada sebuah SMA yang
                karena jumlah muridnya kurang memenuhi syarat, akhirnya
                dipindahkan ke kota Denpasar.
              </li>
            </ul>

            <p className="mt-4">
              Pada tahun ajaran 1982/1983 terdaftar sebagai SMA Swasta dalam
              lingkungan pembinaan Kantor Wilayah Departemen Pendidikan dan
              Kebudayaan Propinsi Bali dengan dikeluarkannya surat keputusan
              oleh Kepala kantor Wilayah Dept. P dan K{" "}
              <strong>Drs. I Gst Agung Gede Oka</strong>, tertanggal 21 Juni
              1982 nomor 251/I.l9.l/I.19.82.
            </p>

            <p>
              Pada tahun ajaran 1999/2000 banyak berdiri sekolah swasta dengan
              ciri khas masing-masing. Bulan Januari tahun 2000 ada situasi
              kemasyarakatan yang menghendaki agar semua lembaga pendidikan
              swasta meninjau ulang nama Yayasan dan nama sekolah sesuai dengan
              ciri khas mereka.
            </p>

            <p>
              Yayasan Swastiastu Pusat mengadakan pertemuan seluruh Kepala
              Sekolah bertempat di Keuskupan Denpasar, Jalan Rambutan untuk
              membicarakan hal tersebut. Kesimpulan dari pertemuan tersebut nama
              Yayasan Swastiastu diganti dengan nama{" "}
              <strong>Yayasan Insan Mandiri</strong>, dan sekolah-sekolah
              menggunakan nama pelindung orang suci.
            </p>

            <p>
              Sejak didirikan SMAK Swastiastu Tangeb sudah memilih nama
              pelindung
              <strong> “Thomas Aquino”</strong> sebagai orang suci yang
              peranannya diakui dunia karena memberikan sumbangan pemikiran
              besar tentang tata negara dan hubungan manusia dengan Tuhan. Salah
              satu pemikiran penting beliau adalah konsep{" "}
              <strong>trias politica</strong>: negara hendaknya dikelola oleh
              tiga lembaga — <em>eksekutif, legislatif, dan yudikatif</em>.
              Konsep ini hingga kini dipakai banyak negara di dunia, termasuk
              Indonesia.
            </p>

            <p>
              Maka perubahan nama ini bagi kita bukanlah masalah yang prinsip.
              Perubahan adalah bagian yang tidak terpisahkan dari manusia yang
              ingin bergerak maju. Dalam dunia pendidikan, yang terpenting
              adalah bagaimana kita terus mengubah cara pandang tentang siswa
              sebagai manusia, dan bagaimana menjadikan manusia itu semakin
              manusiawi.
            </p>

            <p>
              Nama yayasan pun berubah, dari nama{" "}
              <strong>Yayasan Swastiastu</strong> menjadi{" "}
              <strong>Yayasan Insan Mandiri</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
