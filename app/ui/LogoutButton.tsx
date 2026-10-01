"use client";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/app/ui/Button";

export function LogoutButton() {
	const { logout } = useAuth();
	// au clic : appelle l'API, vide le token, redirige vers /login
	return (
		<Button onClick={logout} className="w-full">
			Se déconnecter
		</Button>
	);
}
