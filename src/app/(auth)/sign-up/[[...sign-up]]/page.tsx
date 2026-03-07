import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Start your free trial</h1>
          <p className="text-slate-400">No credit card required. Up and running in 15 minutes.</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
