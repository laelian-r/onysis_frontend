export function Input({
	className = "",
	...props
}: React.ComponentProps<"input">) {
	return (
		<input className={`rounded p-2 bg-background ${className}`} {...props} />
	);
}

export function Textarea({
	className = "",
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea className={`rounded p-2 bg-background ${className}`} {...props} />
	);
}

// import { Types } from "@/app/ui/Types";

export function Select({
	className = "",
	...props
}: React.ComponentProps<"select">) {
	return (
		<select className={`rounded bg-background p-2 ${className}`} {...props} />
	);
}
