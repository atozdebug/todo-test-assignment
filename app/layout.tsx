import type { Metadata } from "next";
import "./globals.css";
import { PoppinsF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Todo List",
  description: "Add your Todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PoppinsF.variable} ${PoppinsF.className}   antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
