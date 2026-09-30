import { AuthHeader } from "@/app/ui/AuthHeader";

// Pas de sidebar ici : header avec le nom de la page + main
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<AuthHeader />
			<main className="flex flex-1 flex-col gap-2 p-4">{children}</main>
		</div>
	);
}
