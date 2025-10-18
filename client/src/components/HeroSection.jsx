"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpeg"
          alt="SMAK Thomas Aquino"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/50 to-blue-600/60" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              SMAK Thomas Aquino
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
            Berkualitas dalam mengembangkan insan yang cerdas, mandiri, dan
            berkarakter.
            <br />
            <span className="text-lg text-blue-200">
              Wujudkan impian masa depanmu bersama kami!
            </span>
          </p>
        </div>

        {/* Statistics
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <Users className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-sm text-blue-200">Siswa Aktif</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <BookOpen className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-blue-200">Program Studi</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <Award className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-sm text-blue-200">Prestasi</div>
          </div>
        </div> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Daftar Sekarang
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
    </section>
  );
}
