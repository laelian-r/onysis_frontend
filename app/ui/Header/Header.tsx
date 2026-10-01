"use client";

import { useAuth } from "@/hooks/auth";
import { LogoutButton } from "@/app/ui/LogoutButton";
import Link from "next/link";

export function Header() {
	const { user, loading: authLoading } = useAuth();

	return (
		<header className="bg-white flex gap-2 justify-between items-center p-4">
			{authLoading ? null : user ? (
				<>
					<h1 className="text-2xl font-bold">
						Bienvenue, <span className="text-purple-500">{user.name}</span>
					</h1>
<<<<<<< HEAD:app/ui/Header.tsx
=======

					<div className="flex gap-2">
						<Link
							href="/releases/new"
							className="p-2 bg-primary text-white rounded"
						>
							Nouvelle sortie
						</Link>
					</div>
>>>>>>> f7fe45c (Refactor application structure and update UI components):app/ui/Header/Header.tsx
				</>
			) : (
				<>
					<h1 className="text-2xl font-bold">Bienvenue</h1>

					<div className="flex gap-2">
						<Link href="/login" className="p-2 bg-primary text-white rounded">
							Connexion
						</Link>
						<Link
							href="/register"
							className="p-2 bg-gray-500 text-white rounded"
						>
							S'inscrire
						</Link>
					</div>
				</>
			)}
		</header>
	);
}
