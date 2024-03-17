import {json} from 'react-router-dom'
import {Product} from '@/db'
import {toast} from 'react-toastify'
import {loader as searchLoader} from '@/controllers/products/search'


export async function loader({request}){
	try {
		let {searchParams} = new URL(request.url)
		let page = searchParams.has('page') ? searchParams.get('page') : 1
		let limit = 20
		let skipPages = (limit * (Number(page) - 1))
		let filters = {}
		
		if( searchParams.has('q') ){
			return await searchLoader({request})
		}
		
		
		let products = await Product
			.filter(doc => {
				return !doc.deleted
			})
			.reverse()
			.sortBy('created')
		let count = products.length
		
		return json({products, count}, {status: 202})
		
	} catch (e) {
		toast.error(`Error: ${e.message}`)
		return null
	}
}
