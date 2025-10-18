import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useRoleGuard(allowedRoles) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRole = () => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // Cek apakah user sudah login
      if (!userData || !token) {
        router.replace("/admin");
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Cek apakah user punya role yang diizinkan
        if (!allowedRoles.includes(user.role)) {
          router.replace("/unauthorized");
          return;
        }

        // Jika semua cek lolos, set isChecking false
        setIsChecking(false);
      } catch (error) {
        // Jika gagal parse data user, redirect ke login
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    // Delay kecil untuk memastikan localStorage sudah ready
    const timer = setTimeout(checkRole, 100);
    return () => clearTimeout(timer);
  }, [allowedRoles, router]);

  return isChecking;
}
