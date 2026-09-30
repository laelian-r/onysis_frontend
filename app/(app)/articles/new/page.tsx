"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { requireAuth } from "@/hooks/requireAuth";
import { Form } from "@/app/ui/Form";
import { Input, Textarea } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { Loading } from "@/app/ui/Loading";
import type { FormErrors } from "@/lib/types";

export default function NewArticlePage() {
	const { loading } = requireAuth(); // redirige vers /login si pas connecté
	const router = useRouter();
	const [form, setForm] = useState({ title: "", content: "" });
	const [errors, setErrors] = useState<FormErrors>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/articles", form); // Laravel lie l'article au token
			router.push(`/articles/${res.data.id}`);
		} catch (err) {
			const res = (
				err as { response?: { status: number; data: { errors: FormErrors } } }
			).response;
			// 422 = validation échouée (titre vide, contenu trop long...)
			if (res?.status === 422) setErrors(res.data.errors);
		}
	};

	if (loading) return <Loading />;

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				placeholder="Titre"
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			{errors.title && <p>{errors.title[0]}</p>}

			<Textarea
				placeholder="Contenu"
				onChange={(e) => setForm({ ...form, content: e.target.value })}
			/>
			{errors.content && <p>{errors.content[0]}</p>}

			<Button type="submit">Publier</Button>
		</Form>
	);
}
