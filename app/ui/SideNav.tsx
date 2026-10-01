import NavLinks from "@/app/ui/NavLinks";

export default function SideNav() {
	return (
		<aside className="bg-white flex h-screen flex-col px-3 py-4 md:px-2 gap-4 w-2/8 shadow-md z-50">
			<h1 className="text-2xl font-bold">Onysis</h1>
			<NavLinks />
		</aside>
	);
}
