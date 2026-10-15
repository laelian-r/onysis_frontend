"use client";

// Imports des hooks, de l’API et des composants utilisés par le dashboard.
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Loading } from "@/app/ui/Loading";
import NextReleaseCard from "@/app/ui/Releases/NextReleaseCard";
import type { Release } from "@/app/ui/Releases/ReleaseCard";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tasks from "@/app/ui/Releases/Tasks";

import Conseils from "@/app/ui/Releases/Conseils";
import MyChart from "@/app/ui/Statistiques/LineChart";

// Le dashboard conserve la liste reçue de l’API et l’état de chargement.
export default function Dashboard() {
	const [releases, setReleases] = useState<Release[]>([]);
	const [loading, setLoading] = useState(true);

	// Récupère les sorties au chargement de la page.
	useEffect(() => {
		api
			.get("/releases")
			.then((res) => setReleases(res.data.data ?? res.data))
			.finally(() => setLoading(false));
	}, []);

	// Produit la date du jour au format AAAA-MM-JJ pour comparer les dates.
	const now = new Date();
	const today = [
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, "0"),
		String(now.getDate()).padStart(2, "0"),
	].join("-");

	// Garde les sorties prévues aujourd’hui ou plus tard, puis trie par date.
	const nextRelease = releases
		.filter((release) => release.release_date?.slice(0, 10) >= today)
		.sort((a, b) =>
			(a.release_date ?? "")
				.slice(0, 10)
				.localeCompare((b.release_date ?? "").slice(0, 10)),
		)[0];

	// Affiche l’indicateur de chargement pendant l’appel à l’API.
	if (loading) return <Loading />;

	// Affiche un message si aucune sortie n’a été récupérée.
	if (releases.length === 0) {
		return (
			<p className="p-4 text-center text-gray-500">
				Aucune donnée n'est disponible pour le moment.
			</p>
		);
	}

	// Affiche uniquement la prochaine sortie, ou un message si elle n’existe pas.
	return (
		<div className="flex flex-col gap-4 h-[100dvh]">
			<section className="flex gap-4 w-full">
				{nextRelease ? (
					<NextReleaseCard release={nextRelease} />
				) : (
					<p className="p-4">Aucune prochaine sortie n’est prévue.</p>
				)}
			</section>

			<section className="flex gap-4 items-start">
				{nextRelease && <Conseils releaseId={nextRelease.id} />}

				<article className="bg-white p-4 rounded-lg w-full flex flex-col gap-2">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-bold">Évolution de l'engagement</h2>

						<Link
							href="/statistics"
							className="text-purple-500 text-sm flex items-center gap-1"
						>
							Voir plus <ArrowRight size={16} />
						</Link>
					</div>

					<MyChart />
				</article>
			</section>
		</div>
	);
}
