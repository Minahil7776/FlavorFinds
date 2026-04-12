"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  const res = await signIn("credentials", {
    redirect: false,
    email: form.email,
    password: form.password,
  });

  setLoading(false);

  if (res?.ok) {
    toast.success("Welcome back 👨‍🍳");
    router.push("/");
  } else {
    toast.error(res?.error || "Login failed");
  }
};


  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <span className={styles.brandIcon}>🍽️</span>
          <h1>Welcome Back</h1>
          <p>Login in to access your saved recipes and pick up right where you left off.</p>
        </div>

        <div className={styles.leftFooter}>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.dotActive}`} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
          Trusted by home cooks around the world.
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Welcome back</p>
          <h2 className={styles.title}>Login</h2>
          <p className={styles.subtitle}>Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email address</label>
              <input
                className={styles.input}
                placeholder="you@example.com"
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                placeholder="••••••••"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <span className={styles.forgotLink}>Forgot password?</span>

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className={styles.divider}>or continue with</div>

          <button className={styles.googleBtn} 
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={loading}>
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <p className={styles.footer}>
            Don&apos;t have an account?{" "}
            <span onClick={() => router.push("/signup")} className={styles.link}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}