import {Inter} from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-6">{children}</div>
    </>
  );
}
