"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import api from "@/lib/axios";

type Conseil = {
	id: number;
	release_id: number;
	title: string;
	description: string;
	urgency: "fort" | "moyen" | "faible";
};

type Props = {
	releaseId: number;
};

const urgencyColors: Record<Conseil["urgency"], string> = {
	fort: "bg-red-500",
	moyen: "bg-yellow-500",
	faible: "bg-green-500",
};

export default function Conseils({ releaseId }: Props) {
	const [conseils, setConseils] = useState<Conseil[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		api
			.get("/conseils")
			.then((res) => {
				const data: Conseil[] = res.data.data ?? res.data;
				setConseils(data.filter((conseil) => conseil.release_id === releaseId));
			})
			.finally(() => setLoading(false));
	}, [releaseId]);

	return (
		<>
			<article className="bg-white p-4 rounded-lg w-full flex flex-col gap-2">
				<h2 className="text-lg font-bold">Conseils</h2>

				{loading ? (
					<p className="text-gray-500">Chargement des conseils…</p>
				) : conseils.length === 0 ? (
					<p className="text-gray-500">Aucun conseil disponible.</p>
				) : (
					conseils.map((conseil, index) => (
						<div key={conseil.id}>
							{index > 0 && <hr className="my-2 text-gray-300" />}
							<div className="flex gap-4 items-center">
								<span
									className={`h-4 w-4 shrink-0 rounded-full ${urgencyColors[conseil.urgency] ?? "bg-gray-400"}`}
								/>
								<div>
									<h3 className="text-md font-bold">{conseil.title}</h3>
									<p className="flex items-center gap-2">
										<ArrowRight className="shrink-0 h-4" />
										{conseil.contenu}
									</p>
								</div>
							</div>
						</div>
					))
				)}
			</article>
		</>
	);
}
