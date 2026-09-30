"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { Button, ButtonLink } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";
import type { Article, User } from "@/lib/types";

export default function ArticlePage() {
	const { user } = useAuth() as { user: User | null };
	const { id } = useParams(); // /articles/12 → "12"
	const router = useRouter();
	const [article, setArticle] = useState<Article | null>(null);
	const [loading, setLoading] = useState(true);

	// Charge l'article (et recharge si l'id change)
	useEffect(() => {
		api
			.get(`/articles/${id}`)
			.then((res) => setArticle(res.data))
			.catch(() => setArticle(null))
			.finally(() => setLoading(false));
	}, [id]);

	// Supprime l'article puis retourne à la liste
	const handleDelete = async () => {
		if (!confirm("Supprimer cet article ?")) return;
		await api.delete(`/articles/${id}`); // Laravel vérifie que c'est bien l'auteur
		router.push("/articles");
	};

	if (loading) return <Loading />;

	// chargement fini mais pas d'article : il n'existe pas
	if (!article) return <p>Article introuvable.</p>;

	const isOwner = user && article.user_id === user.id;

	return (
		<article className="flex flex-col rounded bg-surface p-4">
			<h1 className="text-2xl font-bold text-primary">{article.title}</h1>
			<p>{article.content}</p>
			<p className="mt-4 text-primary">{article.user.name}</p>

			{/* visibles seulement pour l'auteur (la vraie sécurité est côté Laravel) */}
			{isOwner && (
				<div className="mt-4 flex gap-2">
					<ButtonLink href={`/articles/${id}/edit`} variant="success">
						Modifier
					</ButtonLink>
					<Button variant="danger" onClick={handleDelete}>
						Supprimer
					</Button>
				</div>
			)}
		</article>
	);
}
