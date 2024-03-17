import {redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import currentUser from '@/lib/currentUser'
import sessCookie from '@/lib/sessCookie'
import {User, Session} from '@/db'
import bcrypt from 'bcryptjs'
import {v4 as genid, validate as isUUID} from 'uuid'


export async function action({request}){
	
	const searchParams = new URLSearchParams(request.url)
	const data = await request.json()
	const $username = data.user.trim()
	const $password = data.password.trim()
	try {
		
		let user = await User.where({username: $username}).first()
		
		if(
			Object.hasProperty(user, 'password') && 
			bcrypt.compareSync($password, user.password)
		){
			
			let newSession = await Session.add({
				sid: genid(), 
				uid: user.uid, 
				active: true
			})
			
			delete user.password
			currentUser.set({...user})
			sessCookie.set(newSession)
		
			return redirect(
				searchParams.has('next')
					? searchParams.get('next')
					: '/app'
			)
			
		} else {
			toast.warning('Usuario o contraseña no validos')
		}
	} catch (e) {
		console.log(e)
		toast.error(`Unexpected Error: ${e.message}`)
	}
	
	return null
}



export async function loader({request}){
	
	let sessId = sessCookie.get()
	const searchParams = new URLSearchParams(request.url)
	
	if( !isUUID(sessId) ){
		return null
	}
	
	let session = await Session.get(sessId)
	let user = await User.get(session.uid)
	
	if( session.active ){
		delete user.password
		currentUser.set({...user})
		return redirect(
			searchParams.has('next')
				? searchParams.get('next')
				: '/app'
		)
	}
}
