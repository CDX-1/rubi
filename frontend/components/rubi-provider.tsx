'use client';

import { createContext, useState, ReactNode, useContext, useCallback } from "react";
import { Message } from "./chat";

interface RubiContextType {
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
    const [project, setProject] = useState("Untitled Project");
    const [phase, setPhase] = useState("Initial");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    const sendChatMessage = useCallback(async (content: string) => {
        setMessages((prev) => [...prev, { content: content, side: "user" }]);
        return true;
    }, [setMessages]);

    return (
        <RubiContext.Provider value={{ 
            project: project, setProject: setProject,
            phase: phase, setPhase: setPhase,
            messages: messages, setMessages: setMessages,
            isResponseLoading: isResponseLoading, setIsResponseLoading: setIsResponseLoading,

            sendChatMessage: sendChatMessage,
        }}>
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