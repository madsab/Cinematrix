import {Inter} from "next/font/google";
import Navbar from "../components/navbar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar />
    <div className="">{children}</div>
    </>
  );
}
