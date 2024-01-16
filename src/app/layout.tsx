import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserDoc, getUser } from "@/lib/supabase/user";
// import { getTickers } from "@/lib/api/fetch";

export const gotham = localFont({
  src: "../../public/gotham.otf",
  variable: "--font-gotham",
});
export const gothamBold = localFont({
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
  // const tickers = await getTickers();

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
      <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-gotham tracking-wide antialiased"
        )}
      >
        <Header user={user} tickers={[]} />
        <main className="flex w-full grow flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
