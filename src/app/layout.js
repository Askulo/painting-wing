import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/CustomCursor"; // adjust the path if different
import { AudioProvider } from "@/context/AudioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Painting Wing",
  description: "The platform where you find an artist within you",
  icons: {
    icon: "/logo.png", // Place favicon.ico in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <AudioProvider>
          <CustomCursor />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}