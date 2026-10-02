"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Form } from "@/app/ui/Form";
import { Input, Textarea, Select } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export default function NewReleasePage() {
	const router = useRouter();
	const [types, setTypes] = useState<{ id: number; type: string }[]>([]);
	const [form, setForm] = useState({ title: "", content: "", type_id: "" });
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	// Charge les types pour remplir le select
	useEffect(() => {
		api
			.get("/types")
			.then((res) => setTypes(Array.isArray(res.data) ? res.data : []))
			.catch(() => setTypes([]));
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/releases", form);
			router.push(`/releases/${res.data.id}`);
		} catch (err) {
			const res = (
				err as {
					response?: {
						status: number;
						data: { errors: Record<string, string[]> };
					};
				}
			).response;
			if (res?.status === 422) setErrors(res.data.errors);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				placeholder="Titre"
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			{errors.title && <p>{errors.title[0]}</p>}

			<Select
				value={form.type_id}
				onChange={(e) => setForm({ ...form, type_id: e.target.value })}
			>
				<option value="">Choisir un type</option>
				{types.map((t) => (
					<option key={t.id} value={t.id}>
						{t.type}
					</option>
				))}
			</Select>
			{errors.type_id && <p>{errors.type_id[0]}</p>}

			<Button type="submit">Publier</Button>
		</Form>
	);
}
