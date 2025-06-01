import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/CustomCursor"; // adjust the path if different

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Painting Wing",
  description: "The painting where you find an artist within you",
  icons: {
    icon: "/logo.png", // Place favicon.ico in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add custom cursor once, globally */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
