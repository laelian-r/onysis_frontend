<<<<<<< HEAD
import { AuthHeader } from "@/app/ui/AuthHeader";

// Pas de sidebar ici : header avec le nom de la page + main
=======
import { AuthHeader } from "@/app/ui/Header/AuthHeader";

>>>>>>> f7fe45c (Refactor application structure and update UI components)
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
