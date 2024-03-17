import {Link} from 'react-router-dom'


export default function EditProductsHeader(){
	
	return (
		<div className="flex justify-end gap-2 mb-4 px-4">
			<Link 
				className="btn btn-outline" 
				to="/json/v1/products/initialize">
				Nuevo producto
			</Link>
			<Link 
				className="btn btn-outline"
				to="/app/products">
				Productos
			</Link>
		</div>
	)
}