"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { requireAuth } from "@/hooks/requireAuth";
import { Loading } from "@/app/ui/Loading";
import { Input, Textarea } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export default function EditArticlePage() {
	const { id } = useParams();
	const router = useRouter();
	const { user, loading: authLoading } = requireAuth(); // page réservée aux connectés
	const [form, setForm] = useState(null); // null tant que la sortie n'est pas chargé
	const [errors, setErrors] = useState({});

	// Charge la sortie pour pré-remplir le formulaire
	useEffect(() => {
		api.get(`/releases/${id}`).then((res) => {
			// pas l'auteur : retour à la sortie
			if (user && res.data.user_id !== user.id) {
				router.push(`/releases/${id}`);
				return;
			}
			setForm({ title: res.data.title, content: res.data.content });
		});
	}, [id, user, router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.put(`/releases/${id}`, form); // PUT = mise à jour
			router.push(`/releases/${id}`);
		} catch (err) {
			if (err.response?.status === 422) setErrors(err.response.data.errors);
			if (err.response?.status === 403) router.push(`/releases/${id}`); // pas l'auteur
		}
	};

	// on attend l'auth ET la sortie (sinon form.title plante : form vaut null)
	if (authLoading || !form) return <Loading />;

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-gray-200 p-4 rounded gap-2"
		>
			{/* value + onChange = champ contrôlé : React garde la valeur */}
			<Input
				value={form.title}
				placeholder="Titre"
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			{errors.title && <p>{errors.title[0]}</p>}

			<Textarea
				value={form.content}
				placeholder="Contenu"
				onChange={(e) => setForm({ ...form, content: e.target.value })}
			/>
			{errors.content && <p>{errors.content[0]}</p>}

			<Button type="submit">Enregistrer</Button>
		</form>
	);
}
