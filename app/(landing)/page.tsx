"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Loading } from "@/app/ui/Loading";
import Link from "next/link";
import { Button, ButtonLink } from "@/app/ui/Button";

export default function Landing() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && user) {
			router.push("/dashboard");
		}
	}, [loading, user, router]);

	// Pendant qu'on vérifie si l'utilisateur est connecté
	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex flex-col gap-16 items-center justify-center h-screen">
				<div className="flex flex-col items-center justify-center gap-2">
					<h2 className="text-[3rem] font-bold text-primary">Onysis</h2>
					<h3 className="text-2xl font-bold">
						Construis ta carrière musicale en quelques clics !
					</h3>
				</div>

				<div className="inline-flex gap-2">
					<Link
						href={"/login"}
						className="border-1 border-primary p-2 text-primary rounded"
					>
						Connexion
					</Link>

					<ButtonLink href={`/register`} className="w-full">
						S'inscrire gratuitement
					</ButtonLink>
				</div>
			</div>
		</>
	);
}
