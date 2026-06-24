"use client";

import {
    createContext,
    useState,
    ReactNode,
    useContext,
    useCallback,
    useEffect,
} from "react";
import { Message } from "./chat";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

interface RubiSessionType {
    id: string;
    user: {
        email: string;
        name: string;
        credits: number;
    };
    logout: () => Promise<void>;
}

interface RubiContextType {
    session: RubiSessionType | null;
    createProject: (initialPrompt: string) => Promise<void>;
    loadProject: (id: string) => Promise<void>;
    project: string;
    setProject: React.Dispatch<React.SetStateAction<string>>;
    phase: string;
    setPhase: React.Dispatch<React.SetStateAction<string>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    isResponseLoading: boolean;
    setIsResponseLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sendChatMessage: (content: string) => Promise<boolean>;
}

export const RubiContext = createContext<RubiContextType | undefined>(undefined);

interface RubiProviderProps {
    children: ReactNode;
}

export function RubiProvider({ children }: RubiProviderProps) {
    const router = useRouter();

    const [session, setSession] = useState<RubiSessionType | null>(null);
    const [project, setProject] = useState("Untitled Project");
    const [phase, setPhase] = useState("Initial");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
        setSession(null);
        router.push("/login");
    }, [router]);

    const getCredits = useCallback(async (id: string) => {
        const { data } = await supabase
            .from("profiles")
            .select("credits")
            .eq("user_id", id)
            .single();
        return data?.credits;
    }, []);

    useEffect(() => {
        const getInitialSession = async () => {
            const {
                data: { session: supabaseSession },
            } = await supabase.auth.getSession();

            if (supabaseSession) {
                const credits = await getCredits(supabaseSession.user.id);
                setSession({
                    id: supabaseSession.user.id,
                    user: {
                        email: supabaseSession.user.email ?? "Not Logged In",
                        name: supabaseSession.user.user_metadata?.name ?? undefined,
                        credits: credits ?? 0,
                    },
                    logout,
                });
            }
        };

        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, supabaseSession) => {
            if (supabaseSession) {
                const credits = await getCredits(supabaseSession.user.id);
                setSession({
                    id: supabaseSession.user.id,
                    user: {
                        email: supabaseSession.user.email ?? "Not Logged In",
                        name:
                            supabaseSession.user.user_metadata?.display_name ??
                            supabaseSession.user.user_metadata?.name ??
                            undefined,
                        credits: credits ?? 0,
                    },
                    logout,
                });
            } else {
                setSession(null);
                router.push("/login");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, logout, getCredits]);

    const createProject = useCallback(async (initialPrompt: string) => {}, []);

    const loadProject = useCallback(async (id: string) => {}, []);

    const sendChatMessage = useCallback(async (content: string) => {
        setMessages((prev) => [...prev, { content: content, side: "user" }]);
        return true;
    }, []);

    return (
        <RubiContext.Provider
            value={{
                session,
                createProject,
                loadProject,
                project,
                setProject,
                phase,
                setPhase,
                messages,
                setMessages,
                isResponseLoading,
                setIsResponseLoading,
                sendChatMessage,
            }}
        >
            {children}
        </RubiContext.Provider>
    );
}

export function useRubi() {
    const context = useContext(RubiContext);
    if (context === undefined) {
        throw new Error("useRubi must be used within a RubiProvider");
    }
    return context;
}