import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export type Message = {
    content: string;
    side: "user" | "bot";
};

export function ChatMessage({ content, side }: Message) {
    return (
        <div
            className={`flex items-center ${side === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`rounded-xl px-4 py-3 ${side === "user" ? "bg-primary/80" : "bg-accent/80"}`}
            >
                <p>{content}</p>
            </div>
        </div>
    );
}

export default function ChatWindow({
    messages,
    sendChatMessage,
    isResponseLoading,
    className,
}: {
    messages: Message[];
    sendChatMessage: (content: string) => Promise<boolean>;
    isResponseLoading: boolean;
    className?: string;
}) {
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        const success = await sendChatMessage(input);
        if (success) setInput("");
    };

    return (
        <div
            className={`absolute bg-background/80 min-w-2xl flex flex-col right-8 bottom-8 p-4 rounded-3xl ${className}`}
        >
            <div className="flex flex-col space-y-2 py-4">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={`${index}-${message.side}-${message.content}`}
                        content={message.content}
                        side={message.side}
                    />
                ))}
            </div>

            {isResponseLoading && (
                <div className="flex items-center space-x-2 w-full bg-accent/80 rounded-2xl px-2 py-2 my-2">
                    <p>Loading...</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2 w-full bg-accent/80 rounded-2xl px-2 py-2"
            >
                <Input
                    className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                    placeholder="Make me a redstone signal inverter..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                
                <Button type="submit" size="icon">
                    <IconArrowUp />
                </Button>
            </form>
        </div>
    );
}
