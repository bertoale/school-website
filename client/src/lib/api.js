// API functions for fetching school data
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const FILE_BASE_URL =
  process.env.NEXT_PUBLIC_FILE_URL || "http://localhost:3001/uploads";

export const api = {
  // Fetch ekstrakurikuler data
  async fetchEkstrakurikuler() {
    try {
      const response = await fetch(`${API_BASE_URL}/ekstrakurikuler`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("❌ Gagal mengambil data ekstrakurikuler:", error);
      return [];
    }
  },

  // Fetch fasilitas data
  async fetchFasilitas() {
    try {
      const response = await fetch(`${API_BASE_URL}/fasilitas`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("❌ Gagal mengambil data fasilitas:", error);
      return [];
    }
  },

  // Fetch berita data
  async fetchBerita(limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/berita`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Ambil berita terbatas sesuai parameter limit
      return (data.data || []).slice(0, limit);
    } catch (error) {
      console.error("❌ Gagal mengambil data berita:", error);
      return [];
    }
  },

  // Fetch pengumuman data
  async fetchPengumuman() {
    try {
      const response = await fetch(`${API_BASE_URL}/pengumuman`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("❌ Gagal mengambil data pengumuman:", error);
      return [];
    }
  },

  // Helper function untuk format gambar URL
  getImageUrl(imagePath) {
    if (!imagePath) return "/hero.jpeg"; // fallback image
    if (imagePath.startsWith("http")) return imagePath;
    return `${FILE_BASE_URL}/${imagePath}`;
  },

  // Helper function untuk format tanggal
  formatTanggal(tanggal) {
    if (!tanggal) return "Tanggal tidak tersedia";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    };

    return new Date(tanggal).toLocaleString("id-ID", options);
  },

  // Helper function untuk format deskripsi (strip HTML)
  formatDeskripsi(text, length = 150) {
    if (!text) return "";

    // Create a temporary div to strip HTML
    const div = document.createElement("div");
    div.innerHTML = text;
    const plainText = div.textContent || div.innerText || "";

    return plainText.length > length
      ? plainText.slice(0, length) + "..."
      : plainText;
  },
};

export { API_BASE_URL, FILE_BASE_URL };
