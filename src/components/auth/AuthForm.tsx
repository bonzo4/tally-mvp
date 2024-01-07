"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createBrowserClient } from "@supabase/ssr";

export function LoginForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "hsl(147.6 100% 63.7%)",
              brandAccent: "hsl(147.6 100% 63.7% / 90%)",
            },
          },
          dark: {
            colors: {
              defaultButtonText: "white",
              brandButtonText: "black",
            },
          },
        },
      }}
      theme="dark"
      showLinks={false}
      providers={["google", "discord"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}

export function SignupForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_up"
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "hsl(147.6 100% 63.7%)",
              brandAccent: "hsl(147.6 100% 63.7% / 90%)",
            },
          },
          dark: {
            colors: {
              defaultButtonText: "white",
              brandButtonText: "black",
            },
          },
        },
      }}
      theme="dark"
      showLinks={false}
      providers={["google", "discord"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
