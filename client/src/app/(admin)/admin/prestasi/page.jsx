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

export default function PrestasiPage() {
  const [data, setData] = useState([]);

  const [perlombaan, setPerlombaan] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [peringkat, setPeringkat] = useState("");
  const [tahun, setTahun] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);

  const [alert, setAlert] = useState(null);

  const getData = async () => {
    try {
      const res = await api.get("/api/prestasi");
      setData(res.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
      showAlert("Gagal mengambil data prestasi", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const showAlert = (text, type) => {
    setAlert({ text, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async () => {
    try {
      if (!perlombaan || !tingkat || !peringkat || !tahun) {
        showAlert("Semua field wajib diisi", "error");
        return;
      }

      const payload = { perlombaan, tingkat, peringkat, tahun };

      if (isUpdate) {
        await api.put(`/api/prestasi/${idUpdate}`, payload, {
          withCredentials: true,
        });
        showAlert("Prestasi berhasil diperbarui ✅", "success");
      } else {
        await api.post("/api/prestasi", payload, { withCredentials: true });
        showAlert("Prestasi berhasil ditambahkan ✅", "success");
      }

      clearForm();
      setIsDialogOpen(false);
      getData();
    } catch (err) {
      console.log("Error saving data:", err);
      showAlert("Gagal menyimpan data", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await api.delete(`/api/prestasi/${id}`, { withCredentials: true });
      showAlert("Prestasi berhasil dihapus 🗑️", "success");
      getData();
    } catch (err) {
      console.log("Error deleting data:", err);
      showAlert("Gagal menghapus data", "error");
    }
  };

  const handleEdit = (item) => {
    setPerlombaan(item.perlombaan);
    setTingkat(item.tingkat);
    setPeringkat(item.peringkat);
    setTahun(item.tahun);
    setIdUpdate(item._id);
    setIsUpdate(true);
    setIsDialogOpen(true);
  };

  const clearForm = () => {
    setPerlombaan("");
    setTingkat("");
    setPeringkat("");
    setTahun("");
    setIdUpdate(null);
    setIsUpdate(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 drop-shadow-sm tracking-tight">
        Prestasi Sekolah
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

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            clearForm();
            setIsDialogOpen(true);
          }}
        >
          Tambah Prestasi
        </Button>
      </div>

      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-teal-100">
            <TableHead className="p-4 text-left">Perlombaan</TableHead>
            <TableHead className="p-4 text-left">Tingkat</TableHead>
            <TableHead className="p-4 text-left">Peringkat</TableHead>
            <TableHead className="p-4 text-left">Tahun</TableHead>
            <TableHead className="p-4 text-center w-[160px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="p-4">{item.perlombaan}</TableCell>
                <TableCell className="p-4">{item.tingkat}</TableCell>
                <TableCell className="p-4">{item.peringkat}</TableCell>
                <TableCell className="p-4">{item.tahun}</TableCell>
                <TableCell className="p-4 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                Tidak ada data prestasi
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Edit Prestasi" : "Tambah Prestasi"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Perlombaan</Label>
              <Input
                value={perlombaan}
                onChange={(e) => setPerlombaan(e.target.value)}
                placeholder="Contoh: Olimpiade Sains"
              />
            </div>
            <div>
              <Label>Tingkat</Label>
              <Input
                value={tingkat}
                onChange={(e) => setTingkat(e.target.value)}
                placeholder="Contoh: Nasional"
              />
            </div>
            <div>
              <Label>Peringkat</Label>
              <Input
                value={peringkat}
                onChange={(e) => setPeringkat(e.target.value)}
                placeholder="Contoh: Juara 1"
              />
            </div>
            <div>
              <Label>Tahun</Label>
              <Input
                type="number"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                placeholder="Contoh: 2025"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {isUpdate ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
