"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PengumumanPage() {
  const fileURL = process.env.NEXT_PUBLIC_FILE_URL;

  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldGambar, setOldGambar] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [alert, setAlert] = useState(null);

  // Fetch data
  const getData = async () => {
    try {
      const res = await api.get(`/api/pengumuman`);
      setData(res.data.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Reset form
  const clearForm = () => {
    setGambar(null);
    setPreview(null);
    setOldGambar(null);
    setEditId(null);
    setIsUpdate(false);
  };

  // Handle image preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setGambar(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Submit data
  const handleSubmit = async () => {
    const formData = new FormData();
    if (gambar) formData.append("gambar", gambar);

    try {
      if (isUpdate && editId) {
        await api.put(`/api/pengumuman/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showAlert("✅ pengumuman berhasil diperbarui", "success");
      } else {
        await api.post(`/api/pengumuman`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showAlert("✅ Berhasil menambahkan pengumuman", "success");
      }

      getData();
      setDialogOpen(false);
      clearForm();
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Gagal menyimpan data";
      showAlert(msg, "error");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/api/pengumuman/${deleteId}`, {
        withCredentials: true,
      });
      showAlert("✅ Data berhasil dihapus", "success");
      getData();
    } catch (err) {
      showAlert("❌ Gagal menghapus data", "error");
    } finally {
      setConfirmDeleteOpen(false);
      setDeleteId(null);
    }
  };

  // Alert handler
  const showAlert = (text, type) => {
    setAlert({ text, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Open modal for edit
  const openEdit = (item) => {
    setEditId(item._id);
    setIsUpdate(true);
    setOldGambar(item.gambar);
    setDialogOpen(true);
  };

  // Open modal for add
  const openAdd = () => {
    clearForm();
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 drop-shadow-sm tracking-tight">
        pengumuman Sekolah
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

      <div className="flex justify-end mb-6">
        <Button
          onClick={openAdd}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          + Tambah pengumuman
        </Button>
      </div>

      {/* List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">
            Belum ada data pengumuman.
          </div>
        ) : (
          data.map((item) => (
            <Card
              key={item._id}
              className="bg-white/80 border-0 shadow-lg rounded-xl transition hover:scale-[1.02] hover:shadow-xl"
            >
              <CardHeader className="p-0">
                {item.gambar ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.gambar}`}
                    alt=""
                    width={300}
                    height={200}
                    unoptimized
                    className="w-full h-44 object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-44 bg-gray-200 text-gray-500 font-semibold rounded-t-xl">
                    Tidak ada gambar
                  </div>
                )}
              </CardHeader>
              <CardContent className="py-4 px-4">
                {/* <CardTitle className="text-lg font-bold text-teal-700 mb-2 truncate">
                  {item.judul}
                </CardTitle> */}
              </CardContent>
              <CardFooter className="flex justify-between px-4 pb-4">
                <Button
                  variant="outline"
                  onClick={() => openEdit(item)}
                  className="border-teal-600 text-teal-700 hover:bg-teal-50 font-medium rounded-md px-4 py-1"
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteId(item._id);
                    setConfirmDeleteOpen(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-4 py-1"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md mx-auto rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-teal-700">
              {isUpdate ? "Update pengumuman" : "Tambah pengumuman"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="rounded-lg"
            />

            {(preview || oldGambar) && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600">
                  Preview Gambar:
                </p>
                <Image
                  src={
                    preview ||
                    `${process.env.NEXT_PUBLIC_API_URL}/uploads/${oldGambar}`
                  }
                  alt="Preview"
                  width={100}
                  height={100}
                  className="rounded-md mt-2 border border-gray-200 shadow"
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="rounded-lg px-4 py-2"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-4 py-2"
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="max-w-sm mx-auto rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-red-600">
              Konfirmasi Hapus
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            Apakah Anda yakin ingin menghapus data ini?
          </p>
          <DialogFooter className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setConfirmDeleteOpen(false)}
              className="rounded-lg px-4 py-2"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
