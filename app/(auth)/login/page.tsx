"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export default function Login() {
	const { login, errors } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({ email: "", password: "" });
	const [remember, setRemember] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await login(form, remember);
		if (ok) router.push("/releases");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="email"
				placeholder="Email"
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<Input
				type="password"
				placeholder="Mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{errors.credentials && (
				<p className="text-danger">{errors.credentials[0]}</p>
			)}

			<label className="flex items-center gap-2">
				<Input
					type="checkbox"
					checked={remember}
					onChange={(e) => setRemember(e.target.checked)}
				/>
				Se souvenir de moi
			</label>

			<Link href="/forgot-password" className="text-primary underline">
				Mot de passe oublié ?
			</Link>

			<Button type="submit">Se connecter</Button>

			<p className="text-center">
				Pas encore de compte ?{" "}
				<Link href="/register" className="text-primary underline">
					S'inscrire
				</Link>
			</p>
		</Form>
	);
}
