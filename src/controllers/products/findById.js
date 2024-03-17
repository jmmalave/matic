#! src/controllers/products/findById.js

import {Product} from '@/db'
import {json, redirect} from 'react-router-dom'
import {toast} from 'react-toastify'


export async function loader({params}){
	try {

		// find product
		let product = await Product.filter(doc => {
			if( doc.id === params.id && false === doc.deleted ){
				return doc
			}
		}).first()
		
		if( !product ){
			throw new Response( "El producto que buscaba no existe o fue eliminado", {
				status: 404,
				statusText: "ProductNotFound"
			})
		}
		
		return json({item: product}, {status: 202})
	} catch (e) {
		toast.error('Error inesperado: ' + e.message)
		return null //redirect('/app/products')
	}
	
}

