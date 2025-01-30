"use client";

import { useState, useEffect } from "react";
import { Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// More realistic numbers
const BASE_USERS = 342;
const MAX_SPOTS = 500;
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

export function SignUpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userCount, setUserCount] = useState(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      return calculateInitialUsers();
    }
    return BASE_USERS;
  });

  // Slow, realistic counter animation
  useEffect(() => {
    if (open && !isSubmitted) {
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
  }, [open, isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setError("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to join waitlist");
        }

        setIsSubmitted(true);
        const newCount = userCount + 1;
        setUserCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to join waitlist"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const spotsLeft = Math.max(0, MAX_SPOTS - userCount);
  const progressPercentage = Math.min(100, (userCount / MAX_SPOTS) * 100);

  // Early return if no spots left
  if (spotsLeft === 0 && !isSubmitted) {
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
              />
            </div>
            <Button type="submit" className="w-full">
              Notify Me
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            {isSubmitted ? "Thank You!" : "Join the Waitlist"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSubmitted
              ? "We'll notify you when MailMind is ready."
              : "Be among the first to experience MailMind and get exclusive early access."}
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted ? (
          <>
            <div className="space-y-4 mb-4">
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
                  disabled={isSubmitting}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="rounded-full bg-primary/10 p-2">
                <div className="animate-check h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>You're number {userCount.toLocaleString()} in line!</p>
              {spotsLeft > 0 ? (
                <p>
                  Only {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"}{" "}
                  remaining.
                </p>
              ) : (
                <p>You got the last spot!</p>
              )}
              <p className="mt-2 text-xs">
                We'll email you when MailMind is ready for you to try.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
