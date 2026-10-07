"use client";

import { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid, // Vérifié : Sans 's'
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "Janvier", écoutes: 400 },
	{ name: "Février", écoutes: 300 },
	{ name: "Mars", écoutes: 600 },
	{ name: "Avril", écoutes: 800 },
];

export default function MyChart() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded">
				<p className="text-sm text-gray-400">Chargement du graphique...</p>
			</div>
		);
	}

	return (
		<div className="w-full h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="écoutes"
						stroke="#8884d8"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
