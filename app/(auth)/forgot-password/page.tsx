"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Form } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
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
	if (sent) return <p>Un lien vient de vous être envoyé.</p>;

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="email"
				placeholder="Votre email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			{errors.email && <p>{errors.email[0]}</p>}

			<Button type="submit">Envoyer le lien</Button>

			<p className="text-center">
				<Link href="/login" className="text-primary underline">
					Retour à la connexion
				</Link>
			</p>
		</Form>
	);
}
