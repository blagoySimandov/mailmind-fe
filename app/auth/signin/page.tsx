"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/google";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Sign in to MailMind</h1>
          <p className="text-gray-500">
            Connect your Gmail account to get started
          </p>
        </div>
        <Button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full flex items-center justify-center gap-2"
          variant="outline">
          <GoogleIcon className="h-5 w-5" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
