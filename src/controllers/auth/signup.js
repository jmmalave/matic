import {User, Session} from '@/db'
import {redirect} from 'react-router-dom'
import currentUser from '@/lib/currentUser'
import sessCookie from '@/lib/sessCookie'
import {v4 as genid} from 'uuid'
import {toast} from 'react-toastify'
import bcrypt from 'bcryptjs'


export async function action({request}){
	let data = await request.json()
	let salt = bcrypt.genSaltSync(12)
	let password = bcrypt.hashSync(data.password.trim(), salt)
	
	try {
		let userData = {
			uid: genid(),
			role: 'admin',
			username: data.user.trim(),
			password: password
		}
		let newUser = await User.add(userData)
		let newSession = await Session.add({
			sid: genid(),
			uid: newUser,
			active: true
		})
		
		
		delete userData.password
		currentUser.set({...userData})
		sessCookie.set(newSession)
		
		return redirect('/app')
	} catch (e) {
		toast.error(`Unexpected Error: ${e.message}`)
	}
	
	return null
}


export async function loader({request}){
	if( sessCookie.has() ){
		return redirect('/auth/login')
	}
	
	return null
}