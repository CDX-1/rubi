'use client';

import ChatWindow from "@/components/chat";
import { useRubi } from "@/components/rubi-provider";
import TitleBlock from "@/components/title-block";
import { useCallback } from "react";

export default function NewProjectPage() {
    const rubi = useRubi();

    const handleNewProject = useCallback(async (prompt: string) => {
        fetch("/proxy/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Some name",
                initialPrompt: prompt
            }),
        });

        return true;
    }, []);
    
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">

            {/* Grid */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            <TitleBlock title={null} phase={rubi.phase} />

            <ChatWindow messages={rubi.messages} sendChatMessage={handleNewProject} isResponseLoading={rubi.isResponseLoading} />
        </div>
    );
}