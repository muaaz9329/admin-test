"use client";

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentLocale } from "@/internationalization/client";

// derive from props of Link component
type NavLinkProps = React.ComponentProps<typeof Link> & {
  href: string;
  exact?: boolean;
  activeClassName?: string;
};

/**
 * @description NavLink: by default the active class is added when the href matches the start of the URL pathname.
 * Use the exact property to change it to an exact match with the whole URL pathname.
 * @note It adds the current locale by default to the start of href and ignores it while matching
 * for active link
 * @param {NavLinkProps} props
 *
 */
export const NavLink = ({
  href,
  exact,
  children,
  activeClassName = "",
  ...props
}: NavLinkProps) => {
  const currentLocale = useCurrentLocale();

  const pathname = usePathname();
  const isActive = exact
    ? pathname === `/${currentLocale}${href}`
    : pathname.startsWith(`/${currentLocale}${href}`);

  if (isActive) {
    props.className += ` ${activeClassName}`;
  }

  return (
    <Link href={`/${currentLocale}${href}`} {...props}>
      {children}
    </Link>
  );
};
