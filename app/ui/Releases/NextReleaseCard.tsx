"use client";

import ReleaseCard, { type Release } from "@/app/ui/Releases/ReleaseCard";

// Props nécessaires pour afficher la prochaine sortie.
type NextReleaseCardProps = {
	release: Release;
};

// Réutilise la carte existante en activant son style « prochaine sortie ».
export default function NextReleaseCard({ release }: NextReleaseCardProps) {
	return <ReleaseCard release={release} isNextRelease />;
}
