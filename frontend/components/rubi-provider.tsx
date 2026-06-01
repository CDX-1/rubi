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

const supabase = createClient();

interface RubiSessionType {
    id: string;
    user: {
        email: string;
        name: string;
    };
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
    const [session, setSession] = useState<RubiSessionType | null>(null);
    const [project, setProject] = useState("Untitled Project");
    const [phase, setPhase] = useState("Initial");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    // load supabase client session
    useEffect(() => {

        const getInitialSession = async () => {
            const { data: { session: supabasebaseSession } } = await supabase.auth.getSession();

            if (supabasebaseSession) {
                setSession({
                    id: supabasebaseSession.user.id,
                    user: {
                        email: supabasebaseSession.user.email ?? "Not Logged In",
                        name: supabasebaseSession.user.user_metadata?.name ?? undefined
                    }
                });
            }
        }

        getInitialSession();

        // listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
            if (supabaseSession) {
                setSession({
                    id: supabaseSession.user.id,
                    user: {
                        email: supabaseSession.user.email ?? "Not Logged In",
                        name: supabaseSession.user.user_metadata?.name ?? undefined
                    }
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
