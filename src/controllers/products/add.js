import {redirect} from 'react-router-dom'
import {Product} from '@/db'
import {v4 as genid, validate as isUUID} from 'uuid'
import options from '@/lib/options'
import {toast} from 'react-toastify'


export async function loader(){
	try {
		let {unsavedProduct} = await options.get('unsavedProduct')
		let productId;
		let now = Date.now()
		
		
		if( isUUID(unsavedProduct) ){
			let data = await Product.get(unsavedProduct)
			if( data && !data.deleted ){
				productId = data.id
			}
		}
		
		
		if(!productId ){
			let productData = {
				id: genid(),
				name: "",
				codes: [],
				prices: {ves: [], usd: []},
				iva: 0,
				stock: 0,
				lowStockThreshold: 0,
				lowStock: false,
				deleted: false,
				allowSale: false,
				created: Date.now(),
				lastUpdate: Date.now()
			}
			
			let newProduct = await Product.add(productData)
			await options.set('unsavedProduct', newProduct)
			productId = newProduct
		}
		
		return redirect(`/app/products/${productId}/edit`)
	} catch (e) {
		toast.error(`Unexpected Error: ${e.message}`)
		console.log(e)
		return null
	}
}