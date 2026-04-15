import { Link } from "react-router-dom";

import { useState } from "react";



export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="page-transition pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join the ABC community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
          </div>
          <button type="submit" className="btn-primary w-full bg-primary text-primary-foreground h-11 text-sm font-medium rounded-full hover:scale-[1.02] transition-transform">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
