import Link from "next/link";

import { SignupForm } from "@/components/auth/AuthForm";

export default function Signup() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-8 lg:px-16 lg:py-16">
      <div className="w-full max-w-[500px] rounded-3xl bg-zinc-900 px-6 py-8 lg:px-16 lg:py-16">
        <div className="mb-3">
          <h1 className="text-center text-4xl font-medium text-white">
            Sign Up
          </h1>
        </div>
        <div className="mb-4">
          <p className="text-center text-lg text-gray-400">Degening awaits!</p>
        </div>
        <SignupForm />
        <div className="mt-8">
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
