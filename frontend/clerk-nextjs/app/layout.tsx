import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ConditionalNavbar from "./components/ConditionalNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Web Kit",
  description: "AI-powered document chat with authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">
          <ConditionalNavbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
