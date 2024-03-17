import {Invoices, Products} from '@/db'
import {v4 as genid} from 'uuid'



export async function action({request}){
	try {
		
		let data = await request.json();
		console.log(data)
		
		
	} catch (e) {
		
	}
	
	return null
}