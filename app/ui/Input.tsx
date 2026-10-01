export function Input({
	className = "",
	...props
}: React.ComponentProps<"input">) {
	return <input className={`rounded p-2 bg-surface ${className}`} {...props} />;
}

export function Textarea({
	className = "",
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea className={`rounded p-2 bg-surface ${className}`} {...props} />
	);
}
