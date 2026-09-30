"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

// À appeler dans une page qui exige d'être connecté
export function requireAuth() {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		// on attend la fin du chargement, puis on redirige si personne n'est connecté
		if (!auth.loading && !auth.user) {
			router.push("/login");
		}
	}, [auth.loading, auth.user, router]);

	return auth; // la page récupère user, loading, etc.
}
