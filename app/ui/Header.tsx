"use client";

import { useAuth } from "@/hooks/auth";
import { LogoutButton } from "@/app/ui/LogoutButton";
import Link from "next/link";

export function Header() {
	const { user, loading: authLoading } = useAuth();

	return (
		<header className="flex gap-2 mb-4 justify-between p-4">
			{authLoading ? null : user ? (
				<>
					<h1 className="text-2xl font-bold">
						Bienvenue, <span className="text-blue-500">{user.name}</span>
					</h1>
				</>
			) : (
				<>
					<h1 className="text-2xl font-bold">Bienvenue</h1>

					<div className="flex gap-2">
						<Link href="/login" className="p-2 bg-blue-500 text-white rounded">
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
