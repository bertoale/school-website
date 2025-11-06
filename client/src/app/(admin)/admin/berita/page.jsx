"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TiptapEditor from "@/components/TiptapEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Calendar,
  ImageIcon,
} from "lucide-react";

// Utility function to get today's date
function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function BeritaPage() {
  const [dataBerita, setDataBerita] = useState([]);
  const [inputJudul, setInputJudul] = useState("");
  const [inputTanggal, setInputTanggal] = useState(getTodayDate());
  const [inputDeskripsi, setInputDeskripsi] = useState("");
  const [inputGambar, setInputGambar] = useState([]);
  const [previewGambar, setPreviewGambar] = useState([]);
  const [oldGambar, setOldGambar] = useState([]);
  const [idBerita, setIdBerita] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [beritaToDelete, setBeritaToDelete] = useState(null);
  const [beritaSekarang, setBeritaSekarang] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

  // Show alert notification
  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Fetch berita data
  const getBerita = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}/api/berita`);
      setDataBerita(res.data.data);
    } catch (err) {
      console.error("❌ Gagal mengambil data:", err);
      showAlert("Gagal mengambil data berita", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBerita();
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setInputGambar(files);
    setPreviewGambar(files.map((file) => URL.createObjectURL(file)));
  };

  // Clear form inputs
  const clearInput = () => {
    // Revoke object URLs to prevent memory leaks
    previewGambar.forEach((url) => URL.revokeObjectURL(url));
    setInputJudul("");
    setInputDeskripsi("");
    setInputGambar([]);
    setPreviewGambar([]);
    setOldGambar([]);
    setIdBerita("");
    setIsUpdate(false);
    setBeritaSekarang(null);
    setInputTanggal(getTodayDate());
  };

  // Handle form submission
  const onHandleSubmit = async () => {
    if (!inputJudul || inputJudul.trim() === "") {
      showAlert("Judul berita tidak boleh kosong", "error");
      return;
    }

    if (!inputDeskripsi || inputDeskripsi.trim() === "") {
      showAlert("Deskripsi berita tidak boleh kosong", "error");
      return;
    }

    if (!inputTanggal) {
      showAlert("Tanggal berita harus diisi", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("judul", inputJudul);
      formData.append("deskripsi", inputDeskripsi);
      formData.append("tanggal", new Date(inputTanggal).toISOString());

      if (inputGambar && inputGambar.length > 0) {
        inputGambar.forEach((file) => formData.append("gambar", file));
      }

      if (isUpdate) {
        await axios.put(`${apiUrl}/api/berita/${idBerita}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showAlert("✅ Berita berhasil diperbarui", "success");
      } else {
        await axios.post(`${apiUrl}/api/berita`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showAlert("✅ Berita berhasil ditambahkan", "success");
      }

      clearInput();
      setDialogVisible(false);
      getBerita();
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "❌ Terjadi kesalahan saat menyimpan data";
      showAlert(msg, "error");
    }
  };

  // Handle edit berita
  const editBerita = (berita) => {
    setInputJudul(berita.judul);
    setInputDeskripsi(berita.deskripsi);
    setIdBerita(berita._id);
    setIsUpdate(true);
    setBeritaSekarang(berita);
    setOldGambar(berita.gambar || []);
    setDialogVisible(true);

    if (berita.tanggal) {
      const date = new Date(berita.tanggal);
      setInputTanggal(date.toISOString().split("T")[0]);
    }
  };

  // Delete dialog handlers
  const openDeleteDialog = (_id) => {
    setBeritaToDelete(_id);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setBeritaToDelete(null);
  };

  const confirmDelete = async () => {
    if (beritaToDelete) {
      try {
        await axios.delete(`${apiUrl}/api/berita/${beritaToDelete}`, {
          withCredentials: true,
        });
        showAlert("✅ Berita berhasil dihapus", "success");
        getBerita();
      } catch (error) {
        showAlert("❌ Gagal menghapus berita", "error");
        console.error("❌ Gagal menghapus berita:", error);
      }
    }
    closeDeleteDialog();
  };

  // Dialog handlers
  const openDialog = () => {
    clearInput();
    setDialogVisible(true);
  };

  const closeDialog = () => {
    clearInput();
    setDialogVisible(false);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">Berita Sekolah</h1>
        <div className="flex justify-end">
          <Button onClick={openDialog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tambah Berita
          </Button>
        </div>
      </div>

      {/* Alert notification */}
      {alert && (
        <Alert
          className={`mb-6 ${
            alert.type === "success"
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        /* Card list */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dataBerita.map((berita, index) => (
            <Card
              key={berita._id || index}
              className="h-full hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                {berita.gambar && berita.gambar.length > 0 ? (
                  <Image
                    src={`${fileUrl}/uploads/${berita.gambar[0]}`}
                    alt={berita.judul}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                      <span className="text-sm">Tidak ada gambar</span>
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {berita.judul}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(berita.tanggal).toLocaleDateString("id-ID")}
                </div>

                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editBerita(berita)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(berita._id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Form Dialog */}
      <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isUpdate ? (
                <Edit className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {isUpdate ? "Update Berita" : "Tambah Berita"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Judul */}
            <div className="space-y-2">
              <Label htmlFor="judul" className="text-sm font-medium">
                Judul Berita *
              </Label>
              <Input
                id="judul"
                placeholder="Masukkan judul berita"
                value={inputJudul}
                onChange={(e) => setInputJudul(e.target.value)}
              />
            </div>

            {/* Tanggal */}
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="text-sm font-medium">
                Tanggal Berita *
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={inputTanggal}
                onChange={(e) => setInputTanggal(e.target.value)}
              />
            </div>

            {/* Deskripsi dengan Tiptap Editor */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Deskripsi *</Label>
              <TiptapEditor
                content={inputDeskripsi}
                onChange={setInputDeskripsi}
                placeholder="Tulis deskripsi berita..."
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="gambar" className="text-sm font-medium">
                Gambar (MAX 20 Gambar)
              </Label>
              {(!isUpdate ||
                (isUpdate &&
                  beritaSekarang &&
                  (!beritaSekarang.gambar ||
                    !beritaSekarang.gambar.length))) && (
                <Input
                  id="gambar"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              )}

              {/* Preview Images */}
              {((previewGambar && previewGambar.length > 0) ||
                (oldGambar && oldGambar.length > 0)) && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preview Gambar:</Label>
                  <div className="grid grid-cols-6 gap-4">
                    {/* New images preview */}
                    {previewGambar.map((img, idx) => (
                      <div key={`preview-${idx}`} className="relative group">
                        <Image
                          src={img}
                          alt={`preview-${idx}`}
                          width={100}
                          height={100}
                          className="w-full h-20 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">Baru</span>
                        </div>
                      </div>
                    ))}

                    {/* Old images preview */}
                    {oldGambar.map((img, idx) => (
                      <div key={`old-${idx}`} className="relative group">
                        <Image
                          src={`${fileUrl}/uploads/${img}`}
                          alt={`old-${idx}`}
                          width={100}
                          height={100}
                          className="w-full h-20 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">Lama</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Batal
            </Button>
            <Button
              onClick={onHandleSubmit}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogVisible} onOpenChange={setDeleteDialogVisible}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Konfirmasi Hapus
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-700">
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDeleteDialog}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
