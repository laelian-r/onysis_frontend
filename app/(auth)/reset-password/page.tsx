"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";

function ResetForm() {
	const params = useSearchParams(); // lit ?token=...&email=... dans l'URL
	const router = useRouter();
	const { resetPassword, errors } = useAuth();
	const [form, setForm] = useState({ password: "", password_confirmation: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await resetPassword({
			token: params.get("token"), // vient du lien de l'email
			email: params.get("email"),
			...form,
		});
		if (ok) router.push("/login");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="password"
				placeholder="Nouveau mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{errors.password && <p>{errors.password[0]}</p>}

			<Input
				type="password"
				placeholder="Confirmation"
				onChange={(e) =>
					setForm({ ...form, password_confirmation: e.target.value })
				}
			/>
			{/* erreur "lien invalide ou expiré" */}
			{errors.token && <p>{errors.token[0]}</p>}

			<Button type="submit">Réinitialiser</Button>
		</Form>
	);
}

// useSearchParams doit être dans un <Suspense>, sinon "next build" échoue
export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<Loading />}>
			<ResetForm />
		</Suspense>
	);
}
