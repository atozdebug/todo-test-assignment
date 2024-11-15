import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Poppins } from "next/font/google";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PoppinsF = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],

  variable: "--font-poppins",
});
