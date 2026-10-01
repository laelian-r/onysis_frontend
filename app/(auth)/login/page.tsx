"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
=======
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { Input, Textarea } from "@/app/ui/Input";
>>>>>>> f7fe45c (Refactor application structure and update UI components)
import { Button } from "@/app/ui/Button";

export default function Login() {
	const { login, errors } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({ email: "", password: "" });
<<<<<<< HEAD
	const [remember, setRemember] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await login(form, remember);
		if (ok) router.push("/articles");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="email"
				placeholder="Email"
=======
	const [remember, setRemember] = useState(false); // décochée par défaut

	const handleSubmit = async (e) => {
		e.preventDefault();
		const ok = await login(form, remember);
		if (ok) router.push("/dashboard");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-gray-200 p-4 rounded gap-2"
		>
			<Input
				type="email"
				placeholder="Adresse email"
>>>>>>> f7fe45c (Refactor application structure and update UI components)
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<Input
				type="password"
				placeholder="Mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
<<<<<<< HEAD
			{errors.credentials && <p>{errors.credentials[0]}</p>}

			<label className="flex items-center gap-2">
				<input
=======
			{errors.credentials && (
				<p className="text-danger">{errors.credentials[0]}</p>
			)}

			<label className="flex items-center gap-2">
				<Input
>>>>>>> f7fe45c (Refactor application structure and update UI components)
					type="checkbox"
					checked={remember}
					onChange={(e) => setRemember(e.target.checked)}
				/>
				Se souvenir de moi
			</label>

<<<<<<< HEAD
			<Link href="/forgot-password" className="text-primary underline">
=======
			<Link href="/forgot-password" className="text-blue-500 underline">
>>>>>>> f7fe45c (Refactor application structure and update UI components)
				Mot de passe oublié ?
			</Link>

			<Button type="submit">Se connecter</Button>

			<p className="text-center">
				Pas encore de compte ?{" "}
				<Link href="/register" className="text-primary underline">
					S'inscrire
				</Link>
			</p>
<<<<<<< HEAD
		</Form>
=======
		</form>
>>>>>>> f7fe45c (Refactor application structure and update UI components)
	);
}
