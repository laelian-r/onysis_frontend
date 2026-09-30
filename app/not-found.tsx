import Link from "next/link";

// Affichée dans le layout racine uniquement : ni sidebar, ni header
export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">404</h1>
			<p>Cette page est introuvable.</p>
			<Link href="/" className="text-primary underline">
				Retour à l'accueil
			</Link>
		</main>
	);
}
