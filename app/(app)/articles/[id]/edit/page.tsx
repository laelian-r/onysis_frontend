"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { requireAuth } from "@/hooks/requireAuth";
import { Form } from "@/app/ui/Form";
import { Input, Textarea } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";
import type { FormErrors, User } from "@/lib/types";

type ArticleForm = { title: string; content: string };

export default function EditArticlePage() {
	const { id } = useParams();
	const router = useRouter();
	const { user, loading: authLoading } = requireAuth() as {
		user: User | null;
		loading: boolean;
	}; // page réservée aux connectés
	const [form, setForm] = useState<ArticleForm | null>(null);
	const [errors, setErrors] = useState<FormErrors>({});

	// Charge l'article pour pré-remplir le formulaire
	useEffect(() => {
		api.get(`/articles/${id}`).then((res) => {
			// pas l'auteur : retour à l'article
			if (user && res.data.user_id !== user.id) {
				router.push(`/articles/${id}`);
				return;
			}
			setForm({ title: res.data.title, content: res.data.content });
		});
	}, [id, user, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.put(`/articles/${id}`, form);
			router.push(`/articles/${id}`);
		} catch (err) {
			const res = (
				err as { response?: { status: number; data: { errors: FormErrors } } }
			).response;
			if (res?.status === 422) setErrors(res.data.errors);
			if (res?.status === 403) router.push(`/articles/${id}`); // pas l'auteur
		}
	};

	// on attend l'auth ET l'article (sinon form.title plante : form vaut null)
	if (authLoading || !form) return <Loading />;

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				value={form.title}
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			{errors.title && <p>{errors.title[0]}</p>}

			<Textarea
				value={form.content}
				onChange={(e) => setForm({ ...form, content: e.target.value })}
			/>
			{errors.content && <p>{errors.content[0]}</p>}

			<Button type="submit">Enregistrer</Button>
		</Form>
	);
}
