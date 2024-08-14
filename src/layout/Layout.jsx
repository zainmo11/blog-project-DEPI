import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full max-w-[1440px] mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
