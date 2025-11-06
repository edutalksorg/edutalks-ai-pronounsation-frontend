// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setMessage("⚠️ Please enter both fields.");
    } else {
      setMessage("✅ Login clicked — API disabled for now.");
      setTimeout(() => navigate("/dashboard"), 600);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left hero */}
      <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.2),transparent_35%)]" />
        <div className="relative z-10 max-w-md text-white p-8">
          <h1 className="text-4xl font-bold leading-tight">Master Communication Skills</h1>
          <p className="mt-4 text-white/90">
            Practice with real conversations, get AI feedback, and track your progress daily.
          </p>
          <ul className="mt-6 space-y-3 text-white/95">
            <li>• Voice calling with peers</li>
            <li>• AI pronunciation coach</li>
            <li>• Daily topics and quizzes</li>
          </ul>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email or Phone</Label>
              <Input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or 98xxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <Button type="submit" className="w-full">Login</Button>
          </form>

          {message && (
            <div className="mt-4 p-3 rounded-lg text-sm bg-blue-100 text-blue-800">
              {message}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
