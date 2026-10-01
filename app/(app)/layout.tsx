import SideNav from "@/app/ui/SideNav";
<<<<<<< HEAD
import { Header } from "@/app/ui/Header";

// Le <main> est défini ici, une seule fois : les pages n'en écrivent jamais
export default function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
=======
import { Header } from "@/app/ui/Header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
>>>>>>> f7fe45c (Refactor application structure and update UI components)
	return (
		<div className="flex min-h-screen justify-between">
			<SideNav />
			<div className="flex w-full flex-col">
				<Header />
				<main className="flex flex-1 flex-col p-4">{children}</main>
			</div>
		</div>
	);
}
