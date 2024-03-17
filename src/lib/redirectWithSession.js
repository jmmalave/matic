import {redirect} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function redirectWithSession(cb){
	return async function(ctx){
		try {
			let res = await fetch('/json/v1/auth/verify-session')
			let data = await res.json()
			
			
			if( data.active ){
				return redirect('/app')
			}
			
			if( typeof cb == 'function' ){
				return cb(ctx)
			}
			
			return null
		} catch (e) {
			toast.error('Error de conexión')
			return null
		}
	}
}