export default function ProgressBar({ current, total }) {
	return (
		<div className="flex flex-col gap-0">
			<div className="flex items-center justify-between">
				<p className="text-gray-500">
					{current}/{total} tâches
				</p>
				<p className="text-gray-500">{Math.round((current / total) * 100)}%</p>
			</div>
			<div className="w-full bg-background rounded-full h-2.5 mt-4">
				<div
					className={`bg-primary h-2.5 rounded-full`}
					style={{ width: `${Math.round((current / total) * 100)}%` }}
				></div>
			</div>
		</div>
	);
}
