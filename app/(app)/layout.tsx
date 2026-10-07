"use client";

import SideNav from "@/app/ui/SideNav";
import { Header } from "@/app/ui/Header/Header";
import { Loading } from "@/app/ui/Loading";
import { requireAuth } from "@/hooks/requireAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { user, loading } = requireAuth(); // redirige vers /login si pas connecté

	// Pendant la vérification, ou la redirection d'un visiteur :
	// aucun contenu protégé n'est affiché
	if (loading || !user)
		return (
			<div className="flex min-h-screen">
				<Loading />
			</div>
		);

	return (
		<div className="flex min-h-screen justify-between">
			<SideNav />
			<div className="flex w-full flex-col h-screen overflow-y-auto">
				<Header />
				<main className="flex flex-1 flex-col p-4">{children}</main>
			</div>
		</div>
	);
}
