"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { IconMoon, IconSun, IconUserCog } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogClose, DialogFooter } from "./ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme]);

    const showProfile = useCallback(() => {

    }, []);

    return (
        <Dialog>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>

            <NavigationMenu className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
                <NavigationMenuList className="bg-card border-border border p-1 rounded-3xl shadow-md">
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <IconUserCog />
                            </Button>
                        </DialogTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleToggleTheme}
                        >
                            {!mounted ? (
                                <div className="w-6 h-6" />
                            ) : resolvedTheme === "dark" ? (
                                <IconMoon />
                            ) : (
                                <IconSun />
                            )}
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </Dialog>
    );
}
