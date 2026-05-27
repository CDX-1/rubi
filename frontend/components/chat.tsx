"use client";

import { IconArrowUp, IconFile } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

type Message = {
    isSender: boolean;
    text: string;
}

type Package = {
    title: string;
    description: string;
}

function ChatMessage({ isSender, text }: Message) {
    return (
        <div
            className={`max-w-[80%] border p-3 rounded-2xl ${isSender
                ? "bg-primary text-primary-foreground border-transparent self-end rounded-tr-none"
                : "bg-muted text-muted-foreground border-border self-start rounded-tl-none"
                }`}
        >
            <p className="text-sm">{text}</p>
        </div>
    );
}

function PackageMessage({ title, description }: Package) {
    return (
        <div
            className="max-w-[80%] border p-3 rounded-2xl"
        >
            <p className="text-xs font-mono">PACKAGE CREATED</p>

            <div className="py-4">
                <p className="font-semibold">{title}</p>
                <p className="text-sm">{description}</p>

                <div className="flex items-end space-x-1">
                    <IconFile className="w-4 h-4" />
                    <p className="pt-4 text-xs font-mono">circuit.schem</p>
                </div>
            </div>

            <div className="flex space-x-2">
                <Button variant="outline">
                    Preview
                </Button>

                <Button variant="outline">
                    Import
                </Button>

                <Button>
                    Download Schematic
                </Button>
            </div>
        </div>
    );
}

export default function Chat({ className }: { className?: string }) {
    const [messages, setMessages] = useState<(Message | Package)[]>([
        { title: "Signal Inverter", description: "This circuit will invert a redstone signal" }
    ]);

    return (
        <div
            className={`w-full h-full bg-card border-l border-border p-4 pt-20 shadow-sm flex flex-col ${className}`}
        >
            <div className="flex flex-col space-y-2 items-start mb-auto w-full overflow-y-auto">
                {messages.map((message, index) =>
                    (message as Message)?.text ? (
                        <ChatMessage
                            key={index}
                            isSender={(message as Message).isSender}
                            text={(message as Message).text}
                        />
                    ) : (
                        <PackageMessage
                            key={index}
                            title={(message as Package).title}
                            description={(message as Package).description}
                        />
                    )
                )}
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
