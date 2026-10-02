"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { Header } from "@/app/ui/Header/Header";
import { Loading } from "@/app/ui/Loading";
import { Button, ButtonLink } from "@/app/ui/Button";

export default function ArticlePage() {
	const { user, loading: authLoading } = useAuth();
	const { id } = useParams(); // id lu dans l'URL (/releases/12 → "12")
	const router = useRouter();
	const [release, setRelease] = useState(null); // null tant qu'il n'est pas chargé
	const [loading, setLoading] = useState(true);

	// Charge la sortie (et recharge si l'id change)
	useEffect(() => {
		api
			.get(`/releases/${id}`)
			.then((res) => setRelease(res.data))
			.finally(() => setLoading(false));
	}, [id]);

	// Supprime l'article puis retourne à la liste
	const handleDelete = async () => {
		if (!confirm("Supprimer cet article ?")) return; // l'utilisateur peut annuler
		await api.delete(`/releases/${id}`); // Laravel vérifie que c'est bien l'auteur
		router.push("/dashboard");
	};

	if (loading) return <Loading />;

	// chargement fini mais pas d'article : il n'existe pas (404)
	if (!release) return <p>Sortie introuvable.</p>;

	// ici release n'est jamais null
	const isOwner = user && release.user_id === user.id;

	return (
		<>
			<article className="flex flex-col bg-white p-4 rounded mx-4">
				<h1 className="text-2xl font-bold text-purple-500">{release.title}</h1>
				{release.type && <p>{release.type.type}</p>}
				<p className="text-purple-500 mt-4 text-">{release.user.name}</p>

				{/* boutons visibles seulement pour l'auteur (la vraie sécurité est côté Laravel) */}
				{isOwner && (
					<div className="flex gap-2 mt-4">
						<ButtonLink href={`/releases/${id}/edit`} variant="success">
							Modifier
						</ButtonLink>
						<Button variant="danger" onClick={handleDelete}>
							Supprimer
						</Button>
					</div>
				)}
			</article>
		</>
	);
}
