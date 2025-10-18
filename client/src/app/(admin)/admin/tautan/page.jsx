"use client";

import { useEffect, useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

export default function TautanPage() {
  const [data, setData] = useState(null);
  const [tautan, setTautan] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);

  const showAlert = (text, type) => {
    setAlert({ text, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const getData = async () => {
    try {
      const res = await api.get("/api/tautan");
      if (res.data.data && res.data.data.length > 0) {
        setData(res.data.data[0]);
        setTautan(res.data.data[0].tautan);
        setIdUpdate(res.data.data[0]._id);
      }
    } catch (err) {
      console.error("Error fetching tautan:", err);
      showAlert("Gagal mengambil data tautan", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!tautan) {
        showAlert("Field tautan tidak boleh kosong", "error");
        return;
      }

      await api.put(
        `/api/tautan/${idUpdate}`,
        { tautan },
        { withCredentials: true }
      );
      showAlert("Tautan berhasil diperbarui ✅", "success");
      setIsDialogOpen(false);
      getData();
    } catch (err) {
      console.error("Error updating tautan:", err);
      showAlert("Gagal memperbarui tautan", "error");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700 drop-shadow-sm tracking-tight">
        Tautan Sekolah
      </h1>

      {alert && (
        <Alert
          className={`mb-4 rounded-lg shadow-sm ${
            alert.type === "success"
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          }`}
        >
          <AlertDescription className="text-base font-medium text-gray-700">
            {alert.text}
          </AlertDescription>
        </Alert>
      )}

      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption>Tautan utama sekolah</TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-100">
            <TableHead className="p-4 text-left">Tautan</TableHead>
            <TableHead className="p-4 text-center w-[160px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            <TableRow className="hover:bg-gray-50">
              <TableCell className="p-4">{data.tautan}</TableCell>
              <TableCell className="p-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-gray-500 py-6">
                Tidak ada data tautan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tautan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Tautan</Label>
              <Input
                value={tautan}
                onChange={(e) => setTautan(e.target.value)}
                placeholder="Contoh: /beranda atau https://smakn1kebangsaan.sch.id"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdate}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
