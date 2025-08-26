import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MpesaBilling",
  description: "Web app to sell products and accept M-Pesa STK Push payments with real-time monitoring, admin back office, and secure RBAC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AppSessionProvider>{children}</AppSessionProvider>
      </body>
    </html>
  );
}
