import Link from "next/link";

import { LoginForm } from "@/components/auth/AuthForm";

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-8 lg:px-16 lg:py-16">
      <div className="w-full max-w-[500px] rounded-3xl bg-zinc-900 px-6 py-8 lg:px-16 lg:py-16">
        <div className="mb-3">
          <h1 className="text-center text-4xl font-medium text-white">
            Log In
          </h1>
        </div>
        <div className="mb-4">
          <p className="text-center text-lg text-gray-400">Degening awaits!</p>
        </div>
        <LoginForm />
        <div className="mt-8">
          <p className="text-center text-gray-400">
            Don&apos;t yet have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
