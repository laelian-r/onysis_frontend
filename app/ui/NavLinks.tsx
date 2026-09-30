"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/hooks/auth";
import { LogoutButton } from "@/app/ui/LogoutButton";
import { DropdownMenu } from "@/app/ui/DropdownMenu";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const connectedLinks = [
	{ name: "Articles", href: "/articles" },
	{
		name: "Nouvel article",
		href: "/articles/new",
		// icon: DocumentDuplicateIcon,
	},
];

const disconnectedLinks = [
	{ name: "Articles", href: "/articles" },
	{ name: "Connexion", href: "/login" },
	{ name: "Inscription", href: "/register" },
];

export default function NavLinks() {
	const pathname = usePathname();
	const { user, loading: authLoading } = useAuth();

	return (
		<>
			{authLoading ? null : user ? (
				<div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
					{connectedLinks.map((link) => {
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
									{
										"bg-sky-100 text-blue-600": pathname === link.href,
									},
								)}
							>
								<p className="hidden md:block">{link.name}</p>
							</Link>
						);
					})}
					<DropdownMenu />
					<div className="h-full"></div>
					<LogoutButton />
				</div>
			) : (
				<div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
					{disconnectedLinks.map((link) => {
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
									{
										"bg-sky-100 text-blue-600": pathname === link.href,
									},
								)}
							>
								<p className="hidden md:block">{link.name}</p>
							</Link>
						);
					})}
				</div>
			)}
		</>
	);
}
