import {Product} from '@/db'
import {redirect} from 'react-router-dom'
import options from '@/lib/options'
import {validate as is_uuid} from 'uuid'
import {toast} from 'react-toastify'


export async function action({params, request}){
	try {
		let data = await request.json()
		let {unsavedProduct} = await options.get('unsavedProduct')
		
		let result = await Product.update(params.id, data)
		
		if( is_uuid(unsavedProduct) && unsavedProduct === params.id ){
			await options.set('unsavedProduct')
		}
		
		toast.success('Producto modificado correctamente')
		return redirect(`/app/products/${params.id}`)
		
	} catch (e) {
		toast.error(`Unexpected Error: ${e.message}`)
		return null
	}
	
}