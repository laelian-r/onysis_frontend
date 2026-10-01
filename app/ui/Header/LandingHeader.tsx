"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, ButtonLink } from "@/app/ui/Button";

const titles: Record<string, string> = {
	"/": "Onysis",
};

export function LandingHeader() {
	const pathname = usePathname();

	return (
		<header className="flex bg-surface p-4 justify-between items-center">
			<h1 className="text-2xl font-bold">{titles[pathname] ?? ""}</h1>

			<div className="inline-flex gap-2">
				<Link
					href={"/login"}
					className="border-1 border-primary p-2 text-primary rounded"
				>
					Connexion
				</Link>

				<ButtonLink href={`/register`} className="w-full">
					Inscription
				</ButtonLink>
			</div>
		</header>
	);
}
