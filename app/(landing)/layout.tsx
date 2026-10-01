import { LandingHeader } from "@/app/ui/Header/LandingHeader";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<LandingHeader />
			<main className="flex flex-1 flex-col gap-2 p-4">{children}</main>
		</div>
	);
}
