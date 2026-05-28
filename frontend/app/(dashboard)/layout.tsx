import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Rubi",
    description: "Generate Minecraft Redstone Circuits",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full w-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                notoSans.variable,
                geistHeading.variable,
            )}
            suppressHydrationWarning
        >
            <body className="w-full">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full">
                            <SidebarTrigger className="absolute z-50" />
                            {children}
                            <Toaster />
                        </main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
