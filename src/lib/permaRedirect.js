import {redirect} from 'react-router-dom'


export default function permaRedirect(from, to){
	return ({request}) => {
		let url = new URL(request.url)
		if( url.pathname == from ){
			return redirect(to, 308)
		}
		return null
	}
}