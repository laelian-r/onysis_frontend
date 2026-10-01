import { AuthHeader } from "@/app/ui/Header/AuthHeader";

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
