export function InputText({
	className = "",
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			type="text"
			className={`rounded p-2 bg-background ${className}`}
			{...props}
		/>
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

export function Select({
	className = "",
	...props
}: React.ComponentProps<"select">) {
	return (
		<select className={`rounded bg-background p-2 ${className}`} {...props} />
	);
}

export function InputNumber({
	className = "",
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			type="number"
			className={`rounded p-2 bg-background ${className}`}
			{...props}
		/>
	);
}

export function InputDate({
	className = "",
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			type="date"
			className={`rounded p-2 bg-background ${className}`}
			{...props}
		/>
	);
}
