"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { ButtonLink } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";
import type { Article, User } from "@/lib/types";

export default function ArticlesPage() {
	const { user } = useAuth() as { user: User | null };
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);

	// Charge les articles une seule fois (route publique, pas besoin de token)
	useEffect(() => {
		api
			.get("/articles")
			.then((res) => {
				const payload = res.data?.data ?? res.data;
				setArticles(Array.isArray(payload) ? payload : []);
			})
			.catch(() => setArticles([]))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Loading />;

	if (articles.length === 0)
		return <p className="m-auto text-gray-500">Aucun article pour le moment.</p>;

	return (
		<section className="flex flex-wrap gap-4">
			{articles.map((article) => {
				// vrai si l'article appartient à l'utilisateur connecté
				const isOwner = user && article.user_id === user.id;

				return (
					<article
						key={article.id}
						className="flex w-2/6 flex-col rounded bg-surface p-4"
					>
						<div className="flex justify-between">
							<h2 className="text-xl font-bold">{article.title}</h2>
							{isOwner && (
								<span className="rounded bg-primary p-1 text-white">Vous</span>
							)}
						</div>

						{/* nom de l'auteur, fourni par with('user') côté Laravel */}
						<p>{article.user.name}</p>

						<ButtonLink href={`/articles/${article.id}`} className="mt-4 w-full">
							Voir
						</ButtonLink>
					</article>
				);
			})}
		</section>
	);
}
