"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { Loading } from "@/app/ui/Loading";
import ReleaseCard from "@/app/ui/Releases/ReleaseCard";
import NextReleaseCard from "@/app/ui/Releases/NextReleaseCard";

type User = { id: number; name: string };

type Article = {
	id: number;
	title: string;
	user_id: number;
	user: { name: string };
	release_date: string | null;
};

export default function Releases() {
	const { user } = useAuth() as {
		user: User | null;
		[key: string]: any;
	};
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api
			.get("/releases")
			.then((res) => setArticles(res.data.data ?? res.data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Loading />;

	const now = new Date();
	const today = [
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, "0"),
		String(now.getDate()).padStart(2, "0"),
	].join("-");

	const nextRelease = articles
		.filter((article) => article.release_date?.slice(0, 10) >= today)
		.sort((a, b) =>
			(a.release_date ?? "")
				.slice(0, 10)
				.localeCompare((b.release_date ?? "").slice(0, 10)),
		)[0];

	return articles.length === 0 ? (
		<p className="p-4 text-center text-gray-500">
			Aucune sortie pour le moment.
		</p>
	) : (
		<section className="flex flex-wrap gap-4">
			{nextRelease && (
				<NextReleaseCard key={nextRelease.id} release={nextRelease} />
			)}
			{articles
				.filter((article) => article.id !== nextRelease?.id)
				.map((article) => {
					return (
						<ReleaseCard
							key={article.id}
							release={article}
							isNextRelease={false}
						/>
					);
				})}
		</section>
	);
}
