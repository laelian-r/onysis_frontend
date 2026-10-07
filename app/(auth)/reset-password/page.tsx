"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";
<<<<<<< HEAD
import { Form } from "@/app/ui/Form";
import { InputText } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";
=======
import { InputText, Textarea } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
>>>>>>> f7fe45c (Refactor application structure and update UI components)

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
<<<<<<< HEAD
			...form,
		});
		if (ok) router.push("/login");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputText
				type="password"
				placeholder="Nouveau mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{errors.password && <p>{errors.password[0]}</p>}

			<InputText
				type="password"
				placeholder="Confirmation"
=======
			...form, // password + password_confirmation
		});
		if (ok) router.push("/login"); // succès : direction connexion
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-gray-200 p-4 rounded gap-2"
		>
			<InputText
				type="password"
				placeholder="Mot de passe"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{errors.password && <p className="text-danger">{errors.password[0]}</p>}
			<InputText
				type="password"
				placeholder="Confirmer le mot de passe"
>>>>>>> f7fe45c (Refactor application structure and update UI components)
				onChange={(e) =>
					setForm({ ...form, password_confirmation: e.target.value })
				}
			/>
			{/* erreur "lien invalide ou expiré" */}
<<<<<<< HEAD
			{errors.token && <p>{errors.token[0]}</p>}

			<Button type="submit">Réinitialiser</Button>
		</Form>
=======
			{errors.token && <p className="text-danger">{errors.token[0]}</p>}

			<Button type="submit">Réinitialiser</Button>
		</form>
>>>>>>> f7fe45c (Refactor application structure and update UI components)
	);
}

// useSearchParams doit être dans un <Suspense>, sinon "next build" échoue
export default function ResetPasswordPage() {
	return (
<<<<<<< HEAD
		<Suspense fallback={<Loading />}>
=======
		<Suspense>
>>>>>>> f7fe45c (Refactor application structure and update UI components)
			<ResetForm />
		</Suspense>
	);
}
