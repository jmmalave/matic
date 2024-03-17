

export function Card({children, ...props}){
	return (
		<div 
			className="rounded-2xl p-6 border-b-4 border-vibrant-dark bg-white shadow-xl shadow-gray-200"
		>
			{children}
		</div>
	)
}

