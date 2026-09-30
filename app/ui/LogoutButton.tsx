"use client";
import { useAuth } from "@/hooks/auth";

export function LogoutButton() {
	const { logout } = useAuth();
	// au clic : appelle l'API, vide le token, redirige vers /login
	return (
		<button onClick={logout} className="p-2 bg-blue-500 text-white rounded">
			Se déconnecter
		</button>
	);
}
