import Link from "next/link";

export default function Statistiques() {
	return (
		<>
			<h1>Aucune statistique n'est disponnible pour le moment...</h1>
			<Link href="/" className="text-blue-500 underline">
				Retour au dashboard
			</Link>
		</>
	);
}
