"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Form } from "@/app/ui/Form";
import { InputText, Select, InputNumber, InputDate } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

type ReleaseType = {
	id: number;
	type: string;
};

type Range = {
	min?: number;
	max?: number;
};

function getRange(type: string): Range | null {
	switch (type.toLowerCase()) {
		case "single":
			return { min: 1, max: 1 };
		case "ep":
			return { min: 2, max: 6 };
		case "album":
		case "mixtape":
			return { min: 7 };
		default:
			return null; // Les autres types n'ont pas de contrainte.
	}
}

export default function NewReleasePage() {
	const router = useRouter();
	const [types, setTypes] = useState<ReleaseType[]>([]);
	const [form, setForm] = useState({
		title: "",
		type_id: "",
		number_songs: "",
		release_date: "",
		budget: "",
	});
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	useEffect(() => {
		api
			.get("/types")
			.then((res) => {
				const data = res.data.data ?? res.data;
				setTypes(Array.isArray(data) ? data : []);
			})
			.catch(() => setTypes([]));
	}, []);

	const numberSongs =
		form.number_songs === "" ? null : Number(form.number_songs);
	const selectedType = types.find((type) => String(type.id) === form.type_id);
	const selectedRange = selectedType ? getRange(selectedType.type) : null;

	// Le nombre de morceaux filtre les types contraints compatibles.
	// Les types sans contrainte restent disponibles.
	const availableTypes = types.filter((type) => {
		if (numberSongs === null) return true;

		const range = getRange(type.type);
		if (!range) return true;

		return (
			(range.min === undefined || numberSongs >= range.min) &&
			(range.max === undefined || numberSongs <= range.max)
		);
	});

	function handlenumberSongsChange(value: string) {
		const count = value === "" ? null : Number(value);
		const currentType = types.find((type) => String(type.id) === form.type_id);
		const range = currentType ? getRange(currentType.type) : null;

		const isValid =
			count === null ||
			!range ||
			((range.min === undefined || count >= range.min) &&
				(range.max === undefined || count <= range.max));

		setForm({
			...form,
			number_songs: value,
			type_id: isValid ? form.type_id : "",
		});
	}

	function handleTypeChange(typeId: string) {
		const type = types.find((item) => String(item.id) === typeId);
		const range = type ? getRange(type.type) : null;
		let count = form.number_songs;

		if (
			range?.min !== undefined &&
			(count === "" || Number(count) < range.min)
		) {
			count = String(range.min);
		}
		if (range?.max !== undefined && count !== "" && Number(count) > range.max) {
			count = String(range.max);
		}

		setForm({ ...form, type_id: typeId, number_songs: count });
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await api.post("/releases", {
				...form,
				number_songs: form.number_songs === "" ? "" : Number(form.number_songs),
			});
			router.push(`/releases/${res.data.id}`);
		} catch (err) {
			const response = (
				err as {
					response?: {
						status: number;
						data: { errors: Record<string, string[]> };
					};
				}
			).response;

			if (response?.status === 422) setErrors(response.data.errors);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputText
				placeholder="Titre"
				value={form.title}
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			{errors.title && <p>{errors.title[0]}</p>}

			<Select
				value={form.type_id}
				onChange={(e) => handleTypeChange(e.target.value)}
				required
			>
				<option value="">Choisir un type</option>
				{availableTypes.map((type) => (
					<option key={type.id} value={type.id}>
						{type.type}
					</option>
				))}
			</Select>
			{errors.type_id && <p>{errors.type_id[0]}</p>}

			<InputNumber
				placeholder="Nombre de morceaux"
				value={form.number_songs}
				onChange={(e) => handlenumberSongsChange(e.target.value)}
				min={selectedRange?.min}
				max={selectedRange?.max}
				step={1}
			/>
			{errors.number_songs && <p>{errors.number_songs[0]}</p>}

			<InputDate
				value={form.release_date}
				onChange={(e) => setForm({ ...form, release_date: e.target.value })}
			/>
			{errors.release_date && <p>{errors.release_date[0]}</p>}

			<InputNumber
				placeholder="Budget"
				value={form.budget}
				onChange={(e) => setForm({ ...form, budget: e.target.value })}
				min={0}
				step={0.5}
			/>
			{errors.budget && <p>{errors.budget[0]}</p>}

			<Button type="submit">Ajouter la sortie</Button>
		</Form>
	);
}
