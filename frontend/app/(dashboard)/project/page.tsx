import TitleBlock from "@/components/title-block";

export default function Project() {
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

            {/* Title Block */}
            <TitleBlock title="Unnamed Project" phase="Initial" />
        </div>
    );
}