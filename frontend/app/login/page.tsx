'use client';

import SignUpCard, { LoginCard } from "@/components/auth-cards";
import { useState } from "react";

export default function LoginPage() {
    const [isSigningUp, setSigningUp] = useState(false);
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            {
                isSigningUp
                    ? <SignUpCard className="max-w-sm" onLogin={() => setSigningUp(false)} />
                    : <LoginCard className="max-w-sm" onSignUp={() => setSigningUp(true)} />
            }
        </div>
    )
}
