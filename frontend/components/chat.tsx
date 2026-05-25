"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

type Message = {
    isSender: boolean;
    text: string;
}

function ChatMessage({ isSender, text }: Message) {
    return (
        <div
            className={`max-w-[80%] border p-3 rounded-2xl ${
                isSender
                    ? "bg-primary text-primary-foreground border-transparent self-end rounded-tr-none"
                    : "bg-muted text-muted-foreground border-border self-start rounded-tl-none"
            }`}
        >
            <p className="text-sm">{text}</p>
        </div>
    );
}

export default function Chat({ className }: { className?: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    
    return (
        <div
            className={`w-full h-full bg-card border-l border-border p-4 pt-20 shadow-sm flex flex-col ${className}`}
        >
            <div className="flex flex-col space-y-2 items-start mb-auto w-full overflow-y-auto">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        isSender={message.isSender}
                        text={message.text}
                    />
                ))}
            </div>

            <div className="flex space-x-2 mt-4">
                <Input className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent px-4" placeholder="Build me a compact redstone clock..." />
                <Button size="icon">
                    <IconArrowUp className="h-8 w-8" />
                </Button>
            </div>
        </div>
    );
}
