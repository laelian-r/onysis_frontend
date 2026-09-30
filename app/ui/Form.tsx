export function Form({
	className = "",
	...props
}: React.ComponentProps<"form">) {
	return (
		<form
			className={`flex flex-col gap-2 rounded bg-surface p-4 ${className}`}
			{...props}
		/>
	);
}
