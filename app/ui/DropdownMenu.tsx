"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { ChevronDown } from "lucide-react";

export function DropdownMenu() {
	const { user } = useAuth() as {
		user: { id: number; name: string } | null;
		[key: string]: any;
	};
	const pathname = usePathname();
	const [open, setOpen] = useState(false); // replié par défaut
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) return;

		api
			.get("/articles")
			.then((res) => {
				const mine = res.data.filter((a: any) => a.user_id === user.id);
				setArticles(mine);
			})
			.finally(() => setLoading(false));
	}, [user]);

	if (!user) return null;

	return (
		<div className="flex flex-col">
			{/* Le bouton reprend le style de tes autres liens de sidebar, pour rester cohérent */}
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				aria-expanded={open}
				className="flex h-[48px] items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
			>
				<p className="hidden md:block">Mes articles</p>
				{/* petite flèche qui pivote à l'ouverture */}
				<span
					className={clsx(
						"transition-transform hidden md:block",
						open && "rotate-180",
					)}
				>
					<ChevronDown />
				</span>
			</button>

			{/* Le contenu s'affiche EN DESSOUS du bouton, dans le flux normal —
			    il repousse les liens suivants au lieu de flotter par-dessus */}
			{open && (
				<div className="flex flex-col mt-1 ml-2 pl-2 border-l border-gray-200 gap-1">
					{articles.length === 0 ? (
						<p className="px-3 py-2 text-sm text-gray-500 hidden md:block">
							Aucun article
						</p>
					) : (
						articles.map((article) => (
							<Link
								key={article.id}
								href={`/articles/${article.id}`}
								className={clsx(
									"truncate rounded-md p-2 px-3 text-sm hover:bg-sky-100 hover:text-blue-600 hidden md:block",
									{
										"bg-sky-100 text-blue-600":
											pathname === `/articles/${article.id}`,
									},
								)}
							>
								{article.title}
							</Link>
						))
					)}
				</div>
			)}
		</div>
	);
}
