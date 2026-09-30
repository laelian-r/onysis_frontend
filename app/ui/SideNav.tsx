import Link from "next/link";
import NavLinks from "@/app/ui/NavLinks";

export default function SideNav() {
	return (
		<aside className="bg-surface flex h-screen flex-col px-3 py-4 md:px-2 gap-4 w-1/6 shadow-md">
			<h1 className="text-2xl font-bold">Blog</h1>
			<NavLinks />
		</aside>
	);
}
