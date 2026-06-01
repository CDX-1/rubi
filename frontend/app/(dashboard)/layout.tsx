import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { RubiProvider } from "@/components/rubi-provider";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <RubiProvider>
            <SidebarProvider>
                <AppSidebar />
                <div className="relative flex-1 w-full">
                    <SidebarTrigger className="absolute z-50" />
                    {children}
                </div>
            </SidebarProvider>
        </RubiProvider>
    );
}