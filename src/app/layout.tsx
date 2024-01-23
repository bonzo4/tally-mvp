import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserDoc, getUser } from "@/lib/supabase/queries/user";

const gotham = localFont({
  src: "../../public/gotham.otf",
  variable: "--font-gotham",
});
const gothamBold = localFont({
  src: "../../public/gotham-bold.otf",
  variable: "--font-gotham-bold",
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
  const supabase = createServerSupabaseClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  let user: UserDoc | null = null;

  if (authUser) {
    user = await getUser({ supabase, options: { userId: authUser.id } });
  }
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-tally-background font-gotham tracking-wide antialiased"
        )}
      >
        <Header user={user} />
        <main className="flex w-full grow flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
