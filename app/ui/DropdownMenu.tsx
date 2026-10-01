"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { ChevronDown } from "lucide-react";
import { ButtonLinkAside } from "@/app/ui/Button";

export function DropdownMenu() {
	const { user } = useAuth() as {
		user: { id: number; name: string } | null;
		[key: string]: any;
	};
	const pathname = usePathname();
	const open = pathname === "/releases" || pathname.startsWith("/releases/");
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) return;

		api
			.get("/releases")
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
			{/* <ButtonLink
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				aria-expanded={open}
				className="flex h-[48px] items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-fuchsia-100 hover:text-purple-600 md:p-2 md:px-3"
			> */}
			<ButtonLinkAside
				href="/releases"
				aria-expanded={open}
				className={clsx(
					"flex h-[48px] items-center justify-between gap-2 font-medium hover:bg-primary/10 hover:text-primary md:flex-none md:justify-between md:p-2 md:px-3",
					{ "bg-primary/10 text-primary": open },
				)}
			>
				<p className="hidden md:block">Mes sorties</p>
				<span
					className={clsx(
						"hidden transition-transform md:block",
						open && "rotate-180",
					)}
				>
					<ChevronDown />
				</span>
			</ButtonLinkAside>

			{/* Le contenu s'affiche EN DESSOUS du bouton, dans le flux normal —
			    il repousse les liens suivants au lieu de flotter par-dessus */}
			{open && (
				<div className="mt-1 ml-2 flex flex-col gap-1 border-l border-gray-200 pl-2">
					{articles.length === 0 ? (
						<p className="hidden px-3 py-2 text-sm text-gray-500 md:block">
							Aucune sortie
						</p>
					) : (
						articles.map((article) => (
							<Link
								key={article.id}
								href={`/releases/${article.id}`}
								className={clsx(
									"hidden truncate rounded-md p-2 px-3 text-sm hover:bg-primary/10 hover:text-primary md:block",
									{
										"bg-primary/10 text-primary":
											pathname === `/releases/${article.id}`,
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
