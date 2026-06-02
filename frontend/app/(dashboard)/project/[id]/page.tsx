'use client';

import ChatWindow from "@/components/chat";
import { useRubi } from "@/components/rubi-provider";
import SchemView from "@/components/schem-view";
import TitleBlock from "@/components/title-block";
import { use } from "react";

export default function Project({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const rubi = useRubi();
    
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

            <SchemView />

            <ChatWindow messages={rubi.messages} sendChatMessage={rubi.sendChatMessage} isResponseLoading={rubi.isResponseLoading} />
        </div>
    );
}