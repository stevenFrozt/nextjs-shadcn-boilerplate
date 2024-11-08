"use client";

import React from "react";
import Group from "../Base/Group";
import Container from "../Base/Container";
import ContactBadge from "../ContactBadge";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import Logo from "../Logo";
import NavAvatar from "../NavAvatar";
import MobileNavlinks from "../MobileNavlinks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type props = {
  showLinks?: boolean;
  showContactBadge?: boolean;
  showAvatar?: boolean;
  showBorderBottom?: boolean;
  className?: string;
};

export default function Navbar({
  showLinks = true,
  showContactBadge = true,
  showAvatar = true,
  showBorderBottom = true,
  className,
}: props) {
  const path = usePathname();
  return (
    <nav
      className={cn(
        "bg-white h-[4.5rem] w-full flex items-center  fixed top-0 z-50",
        showBorderBottom ? "border-b-[1px] border" : "",
        className
      )}
    >
      <Container>
        <Group justify="between" align="center">
          <Logo isText />
          <Group gap="gap-6" align="center" className="hidden lg:flex">
            {showLinks &&
              NAV_LINKS?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition duration-200 hover:-translate-y-1 px-4 py-2",
                    path === link.href
                      ? "text-primary font-[600]"
                      : "text-slate-500"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            {showContactBadge && <ContactBadge />}
            {showAvatar && <NavAvatar className="pt-1" />}
          </Group>
          <MobileNavlinks />
        </Group>
      </Container>
    </nav>
  );
}
