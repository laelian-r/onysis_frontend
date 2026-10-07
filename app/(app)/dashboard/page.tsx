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

				{/* <form className="bg-white p-4 rounded-lg w-2/6 flex flex-col">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-bold">Tâches</h2>
						<Link
							href="/dashboard/freestyle-vlrbn-2"
							className="text-purple-500 text-sm flex items-center gap-1"
						>
							Voir plus <ArrowRight size={16} />
						</Link>
					</div>

					<Tasks title="Tâche 1" id="Tache 1" />
					<Tasks title="Tâche 2" id="Tache 2" />
					<Tasks title="Tâche 3" id="Tache 3" />
				</form> */}
			</section>

			<section className="flex gap-4 items-start">
				<article className="bg-white p-4 rounded-lg w-full flex flex-col gap-2">
					<h2 className="text-lg font-bold">Conseils</h2>

					<div className="flex gap-4 items-center">
						<span className="h-4 w-4 bg-red-500 rounded-full"></span>

						<div>
							<h3 className="text-md font-bold">
								Optimise ta campagne de pré-save pour maximiser son impact.
							</h3>

							<p className="flex items-center gap-2">
								<ArrowRight size={16} /> Ton taux de conversion est inférieur à
								celui de tes précédentes sorties
							</p>
						</div>
					</div>

					<hr className="text-gray-300" />

					<div className="flex gap-4 items-center">
						<span className="h-4 w-4 bg-yellow-500 rounded-full"></span>

						<div>
							<h3 className="text-md font-bold">
								Publie davantage de contenus courts
							</h3>

							<p className="flex items-center gap-2">
								<ArrowRight size={16} /> Les contenus courts génèrent 2.4x plus
								d’engagement en ce moment
							</p>
						</div>
					</div>

					<hr className="text-gray-300" />

					<div className="flex gap-4 items-center">
						<span className="h-4 w-4 bg-green-500 rounded-full"></span>

						<div>
							<h3 className="text-md font-bold">
								Tes publications du vendredi fonctionnent mieux
							</h3>

							<p className="flex items-center gap-2">
								<ArrowRight size={16} /> Ton engagement 37% plus élevé ce
								jour-là
							</p>
						</div>
					</div>
				</article>

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
