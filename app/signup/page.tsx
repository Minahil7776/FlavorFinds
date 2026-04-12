"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully 🎉");
        router.push("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <span className={styles.brandIcon}>🍽️</span>
          <h1>Join FlavorFinds</h1>
          <p>
            Discover thousands of recipes from around the world. Save your
            favorites, explore cuisines, and cook like a pro.
          </p>
        </div>

        <div className={styles.leftFooter}>
          <div className={styles.dots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={`${styles.dot} ${styles.dotActive}`} />
          </div>
          Free to join. No credit card required.
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Get started</p>
          <h2 className={styles.title}>Create account</h2>
          <p className={styles.subtitle}>It only takes a few seconds</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Full name</label>
              <input
                className={styles.input}
                placeholder="Gordon Ramsay"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

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

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
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
            Already have an account?{" "}
            <span onClick={() => router.push("/login")} className={styles.link}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}