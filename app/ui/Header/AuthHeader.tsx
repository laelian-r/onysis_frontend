"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
	"/landing": "Onysis",
	"/login": "Connexion",
	"/register": "Inscription",
	"/forgot-password": "Mot de passe oublié",
	"/reset-password": "Nouveau mot de passe",
};

export function AuthHeader() {
	const pathname = usePathname();

	return (
		<header className="bg-surface p-4">
			<h1 className="text-2xl font-bold">{titles[pathname] ?? ""}</h1>
		</header>
	);
}
