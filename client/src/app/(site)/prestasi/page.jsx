"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get } from "http";

export default function PrestasiPage() {
  const [data, setData] = useState([]); // State to hold fetched data

  const getData = async () => {
    try {
      const res = await api.get("/api/prestasi");
      setData(res.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen ">
      {/* <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 drop-shadow-sm tracking-tight">
        Prestasi Sekolah
      </h1> */}

      <Table className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden border-collapse">
        <TableHeader>
          <TableRow className="bg-teal-100">
            <TableHead className="text-left p-4">Perlombaan</TableHead>
            <TableHead className="text-left p-4">Tingkat</TableHead>
            <TableHead className="text-left p-4">Peringkat</TableHead>
            <TableHead className="text-left p-4">Tahun</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id} className="hover:bg-gray-50">
              <TableCell className="p-4">{item.perlombaan}</TableCell>
              <TableCell className="p-4">{item.tingkat}</TableCell>
              <TableCell className="p-4">{item.peringkat}</TableCell>
              <TableCell className="p-4">{item.tahun}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
