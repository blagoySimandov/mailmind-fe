"use client";

import { useState, useEffect } from "react";
import { Mail, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc/client";

// More realistic numbers
const BASE_USERS = 342;
const MAX_SPOTS = 1000;
const STORAGE_KEY = "mailmind_waitlist_count";
const LAST_UPDATE_KEY = "mailmind_last_update";

// Calculate users based on time passed
const calculateInitialUsers = () => {
  const storedCount = localStorage.getItem(STORAGE_KEY);
  const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);

  if (!storedCount || !lastUpdate) {
    localStorage.setItem(STORAGE_KEY, BASE_USERS.toString());
    localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
    return BASE_USERS;
  }

  // Add approximately 2-5 users per hour since last update
  const hoursPassed = (Date.now() - parseInt(lastUpdate)) / (1000 * 60 * 60);
  const newUsers = Math.floor(hoursPassed * (2 + Math.random() * 3));
  const updatedCount = Math.min(MAX_SPOTS, parseInt(storedCount) + newUsers);

  localStorage.setItem(STORAGE_KEY, updatedCount.toString());
  localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());

  return updatedCount;
};

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userCount, setUserCount] = useState(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      return calculateInitialUsers();
    }
    return BASE_USERS;
  });

  // Slow, realistic counter animation
  useEffect(() => {
    if (open && !success) {
      const interval = setInterval(() => {
        setUserCount((prev) => {
          // Add a new user every 2-3 minutes on average (0.6% chance per second)
          if (Math.random() < 0.006) {
            const newCount = prev + 1;
            if (newCount <= MAX_SPOTS) {
              localStorage.setItem(STORAGE_KEY, newCount.toString());
              localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
              return newCount;
            }
          }
          return prev;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [open, success]);

  const submitMutation = trpc.waitlist.submit.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setEmail("");
      setError("");
      // Increment user count on successful submission
      setUserCount((prev) => {
        const newCount = Math.min(MAX_SPOTS, prev + 1);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
        return newCount;
      });
    },
    onError: (error) => {
      if (error.data?.zodError?.fieldErrors.email) {
        setError(error.data.zodError.fieldErrors.email[0]);
      } else {
        setError(error.message);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await submitMutation.mutateAsync({ email });
    } catch (err) {
      // Error is handled by the mutation's onError callback
    }
  };

  const spotsLeft = Math.max(0, MAX_SPOTS - userCount);
  const progressPercentage = Math.min(100, (userCount / MAX_SPOTS) * 100);

  // Early return if no spots left
  if (spotsLeft === 0 && !success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Waitlist Full
            </DialogTitle>
            <DialogDescription className="text-center">
              We've reached our early access limit. Sign up to be notified when
              we open more spots.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitMutation.isLoading}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={submitMutation.isLoading}>
              {submitMutation.isLoading ? "Submitting..." : "Notify Me"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to receive updates about MailMind.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Thank You!</h3>
            <p className="text-muted-foreground">
              Thank you for supporting MailMind! We'll contact you soon with
              exclusive early access details.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-center text-xl">
                Join the Waitlist
              </DialogTitle>
              <DialogDescription className="text-center">
                Be among the first to experience MailMind and get exclusive
                early access.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{userCount.toLocaleString()} people joined</span>
                </div>
                <span className="text-primary font-medium">
                  {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {spotsLeft < 20
                  ? "Hurry! Only a few spots remaining"
                  : spotsLeft < 50
                  ? "Hurry! Spots are filling up quickly"
                  : "Early access spots are limited"}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitMutation.isLoading}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isLoading}>
                {submitMutation.isLoading ? (
                  "Joining..."
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By joining, you agree to receive updates about MailMind.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
