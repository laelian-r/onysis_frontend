import Link from "next/link";

const base = "rounded p-2 text-center text-white hover:opacity-90";
const linkAsideBase = "rounded p-2 text-center text-black";

// classes écrites en entier : Tailwind ne détecte pas `bg-${couleur}`
const variants = {
	primary: "bg-primary",
	background: "bg-background",
	success: "bg-success",
	danger: "bg-danger",
};

type Variant = keyof typeof variants;

export function Button({
	variant = "primary",
	className = "",
	...props
}: React.ComponentProps<"button"> & { variant?: Variant }) {
	return (
		<button
			className={`${base} ${variants[variant]} ${className}`}
			{...props}
		/>
	);
}

export function ButtonLink({
	variant = "primary",
	className = "",
	...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
	return (
		<Link className={`${base} ${variants[variant]} ${className}`} {...props} />
	);
}

export function ButtonLinkAside({
	variant = "background",
	className = "",
	...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
	return (
		<Link
			className={`${linkAsideBase} ${variants[variant]} ${className}`}
			{...props}
		/>
	);
}
