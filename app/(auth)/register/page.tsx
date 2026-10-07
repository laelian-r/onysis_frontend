"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { InputText } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export default function Register() {
	const { register, errors } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({ name: "", email: "", password: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await register(form);
		if (ok) router.push("/releases");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputText
				placeholder="Nom"
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>
			{errors.name && <p>{errors.name[0]}</p>}

			<InputText
				type="email"
				placeholder="Email"
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			{errors.email && <p>{errors.email[0]}</p>}

			<InputText
				type="password"
				placeholder="Mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{errors.password && <p className="text-danger">{errors.password[0]}</p>}

			<Button type="submit">S'inscrire</Button>

			<p className="text-center">
				Déjà un compte ?{" "}
				<Link href="/login" className="text-primary underline">
					Se connecter
				</Link>
			</p>
		</Form>
	);
}
