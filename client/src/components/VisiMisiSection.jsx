"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Leaf,
  BookOpen,
  Wrench,
  School,
  Palette,
  Handshake,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";

export default function VisiMisiSection() {
  const misiItems = [
    {
      icon: Leaf,
      text: "Mengembangkan keimanan dan kecerdasan secara seimbang.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BookOpen,
      text: "Menciptakan proses pembelajaran yang berkualitas.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Wrench,
      text: "Mengupayakan pendidikan terampil hidup.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: School,
      text: "Menciptakan kultur sekolah yang aman dan nyaman.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Palette,
      text: "Mengembangkan kepribadian jujur, disiplin, dan kreatif.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Handshake,
      text: "Memanusiakan manusia Indonesia yang inklusif.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Heart,
      text: "Menanamkan nilai sosial dan keagamaan berbasis cinta kasih.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section
      id="visi-misi"
      className="h-full min-h-screen py-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Visi & Misi
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* VISI */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-600">
                VISI
              </CardTitle>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 text-base leading-relaxed font-medium">
                Berkualitas dalam mengembangkan insan yang cerdas, mandiri, dan
                berkarakter.
              </p>
            </CardContent>
          </Card>

          {/* MISI */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-600">
                MISI
              </CardTitle>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {misiItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${item.bgColor} hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
