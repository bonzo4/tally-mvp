import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types";
import { cookies } from "next/headers";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Tally MVP",
  description: "Put your money where your mouth is.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-mono antialiased",
          roboto
        )}
      >
        <Header authUser={user} />
        <main className="flex flex-col grow w-full items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
