"use client"; // utilise React et localStorage, donc côté navigateur

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { getToken, setToken, removeToken } from "@/lib/token";

export function useAuth() {
	const router = useRouter();
	const [user, setUser] = useState(null); // null = pas connecté
	const [loading, setLoading] = useState(true); // true = on vérifie encore
	const [errors, setErrors] = useState({}); // erreurs de validation Laravel

	// Demande au serveur "qui suis-je ?" grâce au token
	const fetchUser = useCallback(async () => {
		const token = getToken();
		if (!token) {
			// pas de token = pas connecté, inutile d'appeler l'API
			setUser(null);
			setLoading(false);
			return;
		}
		try {
			const res = await api.get("/user");
			setUser(res.data);
		} catch (err) {
			// token invalide ou expiré : on le supprime
			removeToken();
			setUser(null);
		} finally {
			setLoading(false); // vérification terminée, succès ou non
		}
	}, []);

	// Vérifie la session au chargement
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	// Inscription : renvoie true si OK, false sinon
	const register = async (form) => {
		setErrors({});
		try {
			const res = await api.post("/register", form);
			setToken(res.data.token, true); // on garde le token
			setUser(res.data.user ?? null);
			window.location.href = "/articles";
			return true;
		} catch (err) {
			// 422 = erreurs de validation (email déjà pris, etc.)
			if (err.response?.status === 422) setErrors(err.response.data.errors);
			return false;
		}
	};

	// Connexion : même principe que register
	const login = async (form, remember = true) => {
		setErrors({});
		try {
			const res = await api.post("/login", form);
			setToken(res.data.token, remember);
			setUser(res.data.user ?? null);
			window.location.href = "/articles";
			return true;
		} catch (err) {
			if (err.response?.status === 422) {
				setErrors(err.response.data.errors);
			} else {
				// 401 = mauvais identifiants
				setErrors({ credentials: ["Email ou mot de passe incorrect."] });
			}
			return false;
		}
	};

	// Déconnexion
	const logout = async () => {
		try {
			await api.post("/logout"); // Laravel supprime le token en base
		} finally {
			// on nettoie le navigateur même si l'appel échoue
			removeToken();
			setUser(null);
			window.location.href = "/login";
			// router.push("/login");
		}
	};

	// Demande l'email de réinitialisation
	const forgotPassword = async (email) => {
		setErrors({});
		try {
			await api.post("/forgot-password", { email });
			return true;
		} catch (err) {
			if (err.response?.status === 422) setErrors(err.response.data.errors);
			return false;
		}
	};

	// Envoie le nouveau mot de passe avec le token reçu par email
	const resetPassword = async (form) => {
		setErrors({});
		try {
			await api.post("/reset-password", form);
			return true;
		} catch (err) {
			if (err.response?.status === 422) {
				// "errors" = validation ; sinon c'est le message "lien invalide ou expiré"
				setErrors(
					err.response.data.errors ?? { token: [err.response.data.message] },
				);
			}
			return false;
		}
	};

	return {
		user,
		loading,
		errors,
		register,
		login,
		logout,
		forgotPassword,
		resetPassword,
		refetch: fetchUser,
	};
}
