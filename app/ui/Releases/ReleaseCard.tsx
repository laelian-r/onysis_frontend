"use client";

import { Button, ButtonLink } from "@/app/ui/Button";
import api from "@/lib/axios";
import ProgressBar from "@/app/ui/Releases/ProgressBar";

export type Release = {
	id: number;
	title: string;
	type: { id: number; type: string } | null;
	number_songs: number | null;
	release_date: string | null;
	budget: number | null;
};

type ReleaseCardProps = {
	release: Release;
	isNextRelease?: boolean;
};

export default function ReleaseCard({
	release,
	isNextRelease = false,
}: ReleaseCardProps) {
	const releaseDate = release.release_date
		? new Date(
				`${release.release_date.slice(0, 10)}T00:00:00`,
			).toLocaleDateString("fr-FR")
		: null;
	const daysUntilRelease = release.release_date
		? Math.ceil(
				(new Date(`${release.release_date.slice(0, 10)}T00:00:00`).getTime() -
					new Date().setHours(0, 0, 0, 0)) /
					(1000 * 60 * 60 * 24),
			)
		: null;

	const handleDelete = async () => {
		if (!confirm("Supprimer cet article ?")) return; // l'utilisateur peut annuler
		await api.delete(`/releases/${release.id}`); // Laravel vérifie que c'est bien l'auteur
		window.location.reload();
	};

	return (
		<article
			className={`flex w-full flex-col justify-between rounded p-4 ${
				isNextRelease ? "bg-primary/10 gap-2" : "bg-white"
			}`}
		>
			{isNextRelease && (
				<span className="h-fit rounded bg-primary py-1 px-2 text-white w-fit">
					Prochaine sortie
				</span>
			)}
			<div className="flex justify-between items-center gap-2">
				<h2 className="text-2xl font-bold">{release.title}</h2>

				{daysUntilRelease !== null && (
					<span className="text-primary font-bold text-2xl">
						{daysUntilRelease === 0 ? "J" : `J-${daysUntilRelease}`}
					</span>
				)}
			</div>

			<div className="flex justify-between">
				{release.type && (
					<p>
						<span className="text-black/50">{release.type.type}</span>
					</p>
				)}

				{releaseDate && <p className="text-black/50">{releaseDate}</p>}
			</div>

			<ProgressBar current={1} total={10} />

			<div className="flex gap-2 mt-4">
				<ButtonLink href={`/releases/${release.id}`}>Voir plus</ButtonLink>
				<Button variant="danger" onClick={handleDelete}>
					Supprimer
				</Button>
			</div>
		</article>
	);
}
