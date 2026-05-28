"use client";

import {
    IconCirclePlus,
    IconCircuitDiode,
    IconDiamond,
    IconDotsVertical,
    IconLibraryPhoto,
    IconPigMoney,
    IconTrash,
    IconUserCircle,
} from "@tabler/icons-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenu,
    SidebarFooter,
    useSidebar,
    SidebarRail,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useTheme } from "next-themes";

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarTop />
            </SidebarHeader>

            <SidebarContent>
                <SidebarMainGroup />
                <SidebarChatGroup />
            </SidebarContent>

            <SidebarFooter>
                <SidebarUserFooter />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

function SidebarTop() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    className="data-[slot=sidebar-menu-button]:p-1.5!"
                >
                    <a href="#">
                        <IconCircuitDiode className="size-5!" />
                        <span className="text-base font-semibold">
                            Rubi
                        </span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function SidebarMainGroup() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#" className="flex items-center">
                                <IconCirclePlus className="w-6 h-6" />
                                <span>New Project</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#" className="flex items-center">
                                <IconLibraryPhoto className="w-6 h-6" />
                                <span>Gallery</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#" className="flex items-center">
                                <IconPigMoney className="w-6 h-6" />
                                <span>Billing</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

function SidebarChatGroup() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem className="relative flex items-center group/item">
                        <SidebarMenuButton
                            asChild
                            className="transition-all group-hover/item:pr-10"
                        >
                            <a
                                href="#"
                                className="flex items-center w-full min-w-0"
                            >
                                <span className="truncate">
                                    The wonders of how the world impacts us
                                </span>
                            </a>
                        </SidebarMenuButton>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 h-7 w-7 opacity-0 pointer-events-none
                                       group-hover/item:opacity-100
                                       group-hover/item:pointer-events-auto
                                       transition-opacity text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <IconTrash className="h-4 w-4" />
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

function SidebarUserFooter() {
    const { isMobile } = useSidebar();
    const { theme, setTheme } = useTheme();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="w-8 h-8 rounded-lg">
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    Username
                                </span>
                                <div className="flex items-center space-x-1 text-muted-foreground">
                                    <IconDiamond className="w-4 h-4" />
                                    <span className="truncate text-xs">
                                        0 Credits
                                    </span>
                                </div>
                            </div>

                            <IconDotsVertical />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="w-8 h-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Username
                                    </span>
                                    <div className="flex items-center space-x-1 text-muted-foreground">
                                        <IconDiamond className="w-4 h-4" />
                                        <span className="truncate text-xs">
                                            0 Credits
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IconUserCircle />
                                Account
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <IconUserCircle />
                                Dark Mode
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
