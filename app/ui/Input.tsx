export function Input({
	className = "",
	...props
}: React.ComponentProps<"input">) {
<<<<<<< HEAD
	return (
		<input className={`rounded p-2 bg-gray-200 ${className}`} {...props} />
	);
=======
	return <input className={`rounded p-2 bg-surface ${className}`} {...props} />;
>>>>>>> f7fe45c (Refactor application structure and update UI components)
}

export function Textarea({
	className = "",
	...props
}: React.ComponentProps<"textarea">) {
	return (
<<<<<<< HEAD
		<textarea className={`rounded p-2 bg-gray-200 ${className}`} {...props} />
=======
		<textarea className={`rounded p-2 bg-surface ${className}`} {...props} />
>>>>>>> f7fe45c (Refactor application structure and update UI components)
	);
}
