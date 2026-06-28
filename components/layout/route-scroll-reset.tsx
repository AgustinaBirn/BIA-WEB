"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useLayoutEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const previousHtmlScrollBehavior = html.style.scrollBehavior;
        const previousBodyScrollBehavior = body.style.scrollBehavior;

        html.style.scrollBehavior = "auto";
        body.style.scrollBehavior = "auto";

        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
            html.style.scrollBehavior = previousHtmlScrollBehavior;
            body.style.scrollBehavior = previousBodyScrollBehavior;

            html.removeAttribute("data-route-changing");
        });
    }, [pathname]);

    return null;
}