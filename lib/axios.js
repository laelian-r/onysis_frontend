import axios from "axios";
import { getToken } from "@/lib/token";

// Client HTTP préconfiguré : on ne répète pas l'URL de l'API à chaque requête
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // NEXT_PUBLIC_ = accessible dans le navigateur
	withCredentials: true, // envoie les cookies (inutile avec un token Bearer)
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = getToken(); // au lieu de localStorage.getItem("token")
	if (token) config.headers.Authorization = `Bearer ${token}`; // Laravel lit ce header
	return config;
});

export default api;
