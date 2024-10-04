'use client'

import LoginForm from "@/components/Forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
