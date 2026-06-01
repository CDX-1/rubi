'use client';

import { useState, useRef, useEffect } from 'react';

export default function TitleBlock({
    title: initialTitle = null,
    phase,
}: {
    title: string | null;
    phase: string;
}) {
    const [title, setTitle] = useState(initialTitle);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            inputRef.current?.blur();
        }
        if (e.key === "Escape") {
            setTitle(initialTitle);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        console.log("Saved title:", title);
    };

    return (
        <div className="relative z-10 mx-auto max-w-7xl p-8 font-mono">
            <div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
                {`// ${phase}`}
            </div>

            <div className="relative group max-w-fit">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        maxLength={50}
                        className="w-full bg-transparent text-4xl font-bold tracking-tight text-foreground outline-none border-b border-dashed border-muted-foreground focus:border-primary pb-1 caret-primary"
                    />
                ) : (
                    <h1
                        onClick={() => setIsEditing(true)}
                        className="text-4xl font-bold tracking-tight cursor-pointer hover:text-muted-foreground transition-colors duration-150 pb-1 border-b border-transparent group-hover:border-dashed group-hover:border-muted-foreground"
                    >
                        {title || (
                            <span className="text-muted-foreground italic">
                                Untitled
                            </span>
                        )}
                    </h1>
                )}
            </div>
        </div>
    );
}
