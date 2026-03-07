import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back</h1>
          <p className="text-slate-400">Sign in to your ServicePulse dashboard</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
