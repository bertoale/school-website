import "../globals.css";
import Navigation from "@/components/Navbar";
export default function SiteLayout({ children }) {
  return (
    <div className="bg-gradient-to-br from-slate-300 via-blue-50 to-purple-50">
      <Navigation />
      {children}
    </div>
  );
}
