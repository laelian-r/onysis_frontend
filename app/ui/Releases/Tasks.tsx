export default function Tasks({ title, id }) {
	return (
		<div className="flex gap-2 my-2 bg-gray-200/20 rounded p-2 items-center">
			<input
				type="checkbox"
				name={id}
				id={id}
				value={title}
				className="h-4 w-4"
			/>
			<label htmlFor={id} className="text-lg">
				{title}
			</label>
		</div>
	);
}
