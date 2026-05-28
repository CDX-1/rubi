import Chat from "@/components/chat";
import SchemView from "@/components/schem-view";

export default function Home() {
    return (
        <div className="flex bg-secondary">
            <SchemView className="w-2/3" />
            <Chat className="w-1/3 min-h-screen" />
        </div>
    );
}
