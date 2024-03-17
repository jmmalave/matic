import {Product} from '@/db'
import {json} from 'react-router-dom'
import options from '@/lib/options'


export async function action({params, request}){
	try {
		let {unsavedProduct} = await options.get(['unsavedProduct'])
		let data = await request.json()
		let stmt = await Product.where({id: params.id})
		
		if( unsavedProduct && unsavedProduct === params.id ){
			await stmt.delete()
			await options.set('unsavedProduct')
		} else {
			await stmt.modify(data)
		}
		
		return json({done: true})
		
	} catch (e) {
		return json({
			done: false, 
			errorType: e.name, 
			error: e.message
		})
	}
}