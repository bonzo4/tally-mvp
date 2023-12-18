import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Database } from "@/lib/types";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

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
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

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
        <main className="flex flex-col grow w-full items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
