import {redirect} from 'react-router-dom'
import currentUser from '@/lib/currentUser'


export default function withAuthentication(cb = null){
	return async (ctx) => {
		let searchParams = new URLSearchParams()
		let url = new URL(ctx.request.url)
		
		if( !currentUser.has() ){
			searchParams.append('next', url.pathname)
			return redirect(`/auth/login?${searchParams.toString()}`)
		}

		if( cb != undefined && typeof cb == 'function' ){
			let pageProps = await cb(ctx)
			return pageProps
		}
		
		
		return null
	}
}