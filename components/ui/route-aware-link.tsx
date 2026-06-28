"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type RouteAwareLinkProps = ComponentProps<typeof Link>;

function getHrefPathname(href: RouteAwareLinkProps["href"]) {
    if (typeof href === "string") {
        return href.split("#")[0].split("?")[0] || "/";
    }

    return href.pathname || "/";
}

export default function RouteAwareLink({
    href,
    onClick,
    scroll = false,
    ...props
}: RouteAwareLinkProps) {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            scroll={scroll}
            onClick={(event) => {
                const targetPathname = getHrefPathname(href);

                if (pathname !== targetPathname) {
                    document.documentElement.setAttribute(
                        "data-route-changing",
                        "true"
                    );
                }

                onClick?.(event);
            }}
            {...props}
        />
    );
}