import currentUser from '@/lib/currentUser'
import sessCookie from '@/lib/sessCookie'
import {redirect} from 'react-router-dom'
import {Session} from '@/db'


export async function loader(){
	try {
		let sessId = sessCookie.get()
		await Session.where({sid: sessId}).modify({active: false})
		currentUser.delete()
		sessCookie.delete()
		return redirect('/auth/login')
	} catch (e) {
		console.log(e)
		return null
	}
}