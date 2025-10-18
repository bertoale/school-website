"use client";
import { Mail, Phone, MapPin, GraduationCap, School } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2c2c54] via-[#4b3672] to-[#6a4c93] text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-[url('/noise.svg')] bg-cover"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* SMAK THOMAS AQUINO */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <School className="w-6 h-6 text-blue-200" />
              <h6 className="text-lg font-semibold tracking-wide">
                SMAK Thomas Aquino
              </h6>
            </div>

            <ul className="space-y-2 text-sm text-gray-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-blue-300" />
                <span>
                  Gg. Pacar IX, Banjar Tengah, Tangeb, Abianbase, Mengwi,
                  Badung, Bali
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span>(0361) 9072129</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span>smakthomasaquino@ymail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 opacity-70" />
                <span>smakthomasaquino12@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Yayasan */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-200" />
              <h6 className="text-lg font-semibold tracking-wide">
                Yayasan Insan Mandiri Denpasar
              </h6>
            </div>

            <ul className="space-y-2 text-sm text-gray-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-purple-300" />
                <span>
                  Jl. P.B. Sudirman, Dauh Puri Kelod, Denpasar Barat, Denpasar,
                  Bali 80234
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-300" />
                <span>(0361) 8955766</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">SMAK Thomas Aquino</span>
            . All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#visi-misi"
              className="hover:text-white transition-colors duration-300"
            >
              Visi & Misi
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors duration-300"
            >
              Tentang Kami
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-300"
            >
              Kontak
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 blur-lg"></div>
    </footer>
  );
}
