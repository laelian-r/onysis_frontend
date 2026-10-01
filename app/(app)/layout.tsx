import SideNav from "@/app/ui/SideNav";
import { Header } from "@/app/ui/Header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
