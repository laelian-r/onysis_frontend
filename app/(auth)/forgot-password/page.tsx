"use client";

import { useState } from "react";
<<<<<<< HEAD
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
=======
import { useAuth } from "@/hooks/auth";
import { Input, Textarea } from "@/app/ui/Input";
>>>>>>> f7fe45c (Refactor application structure and update UI components)
import { Button } from "@/app/ui/Button";

export default function ForgotPasswordPage() {
	const { forgotPassword, errors } = useAuth();
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false); // true = message de confirmation affiché

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await forgotPassword(email);
		if (ok) setSent(true);
	};

	// Après l'envoi, on remplace le formulaire par un message
<<<<<<< HEAD
	if (sent) return <p>Un lien vient de vous être envoyé.</p>;

	return (
		<Form onSubmit={handleSubmit}>
=======
	if (sent) return <p className="p-4">Un lien viens de vous être envoyé.</p>;

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-gray-200 p-4 rounded gap-2"
		>
>>>>>>> f7fe45c (Refactor application structure and update UI components)
			<Input
				type="email"
				placeholder="Votre email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			{errors.email && <p>{errors.email[0]}</p>}

			<Button type="submit">Envoyer le lien</Button>
<<<<<<< HEAD

			<p className="text-center">
				<Link href="/login" className="text-primary underline">
					Retour à la connexion
				</Link>
			</p>
		</Form>
=======
		</form>
>>>>>>> f7fe45c (Refactor application structure and update UI components)
	);
}
