export default function TitleBlock({ title, phase }: { title: string; phase: string }) {
    return (
        <div className="relative z-10 mx-auto max-w-7xl p-8 font-mono">
            <div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
                {`// ${phase}`}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
                {title}
            </h1>
        </div>
    );
}