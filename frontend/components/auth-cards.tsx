"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginCard({ className }: { className?: string }) {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            toast("Failed to login", {
                description: error.message,
                duration: 3000,
            });
        } else {
            toast("Signed in successfully", {
                duration: 3000,
            });
            setLoading(false);
        }

        router.push("/");
        router.refresh();
    }, [email, password, supabase, router]);

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your email and password below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} id="login-form">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" form="login-form" className="w-full" disabled={loading}>
                    Login
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => router.push("/register")} disabled={loading}>
                    Create Account
                </Button>
            </CardFooter>
        </Card>
    );
}

export function SignUpCard({ className }: { className?: string }) {
    const supabase = createClient();
    const router = useRouter();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName
                }
            }
        });

        setLoading(false);

        if (error) {
            toast("Failed to login", {
                description: error.message,
                duration: 3000,
            });
        } else {
            toast("Signed up successfully", {
                description: "Please check your email for a verification link",
                duration: 3000,
            });
        }

        router.push("/");
        router.refresh();
    }, [email, password, supabase, router]);

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                    Enter your email and password below to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignUp} id="signup-form">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Redstone Enthusiast"
                                    required
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    value={displayName}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <p className="text-xs text-muted-foreground">
                                    This email will be used to contact you and will never be shared with another party.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Ensure your password is at least 8 characters long.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="confirmed-password"
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    value={confirmedPassword}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Must match the password above.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" form="signup-form" className="w-full" disabled={loading}>
                    Create Account
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => router.push("/login")} disabled={loading}>
                    Already have an account?
                </Button>
            </CardFooter>
        </Card>
    );
}
