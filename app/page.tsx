"use client";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/LandingPage";
import HomePage from "@/components/HomePage";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return session ? <HomePage /> : <LandingPage />;
}