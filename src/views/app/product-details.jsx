import {useLoaderData, Link} from 'react-router-dom'
import SaleState from '@/components/edit-products/SaleState'

export function Component(){
	const {item} = useLoaderData()
	
	
	return (
		<div className="View-Product-Details px-4">
			
			<div className="flex justify-end gap-3 mb-4">
				<Link to={`/app/products/${item.id}/edit`} className="btn btn-outline sm">Editar</Link>
				<Link to={`/app/products`} className="btn btn-outline sm">Productos</Link>
			</div>
			
			<h2 className="text-2xl mb-4">{item.name}</h2>
			
			<SaleState />
			
			<div className="mb-4">
				<h3 className="text-xl mb-2">Codigos:</h3>
				<div className="border-2 border-gray-300 rounded-2xl p-5 flex flex-wrap gap-2">
					{item.codes.map((code, i) => (
						<span key={i} className="bg-gray-200 px-3 py-0.5 rounded-full">{code}</span>
					))}
				</div>
			</div>
			
			<div className="grid gap-3 grid-cols-2">
				
			</div>
			
		</div>
	)
}


export {loader} from '@/controllers/products/findById'