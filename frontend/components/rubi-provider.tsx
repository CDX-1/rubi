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
        credits: int;
    };
    logout: () => Promise<void>;
};

interface RubiContextType {
    session: RubiSessionType | null;

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

export const RubiContext = createContext<RubiContextType | undefined>(
    undefined,
);

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

    // load supabase client session
    useEffect(() => {
        const logout = async () => {
            await supabase.auth.signOut();
            setSession(null);
            router.push("/login");
        };

        const getCredits = async (id: string) => {
            const { data } = await supabase.from('profiles').select('credits').eq('user_id', id).single();
            return data?.credits;
        };

        const getInitialSession = async () => {
            const { data: { session: supabaseSession } } = await supabase.auth.getSession();

            if (supabaseSession) {
                setSession({
                    id: supabaseSession.user.id,
                    user: {
                        email: supabaseSession.user.email ?? "Not Logged In",
                        name: supabaseSession.user.user_metadata?.name ?? undefined,
                        credits: await getCredits(supabaseSession.user.id)
                    },
                    logout
                });
            }
        }

        getInitialSession();

        // listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, supabaseSession) => {
            if (supabaseSession) {
                setSession({
                    id: supabaseSession.user.id,
                    user: {
                        email: supabaseSession.user.email ?? "Not Logged In",
                        name: supabaseSession.user.user_metadata?.name ?? undefined,
                        credits: await getCredits(supabaseSession.user.id)
                    },
                    logout
                });
            } else {
                setSession(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        }
        
    }, []);

    const sendChatMessage = useCallback(
        async (content: string) => {
            setMessages((prev) => [
                ...prev,
                { content: content, side: "user" },
            ]);
            return true;
        },
        [setMessages],
    );

    return (
        <RubiContext.Provider
            value={{
                session: session,
                project: project,
                setProject: setProject,
                phase: phase,
                setPhase: setPhase,
                messages: messages,
                setMessages: setMessages,
                isResponseLoading: isResponseLoading,
                setIsResponseLoading: setIsResponseLoading,

                sendChatMessage: sendChatMessage,
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
