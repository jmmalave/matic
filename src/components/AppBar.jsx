import currentUser from '@/lib/currentUser'
import {Link} from 'react-router-dom'


export default function UserBar(){
	const user = currentUser.get()
	
	return (
		<section className="bg-black flex items-center justify-between p-2 text-white h-[42px]">
			<div>
				<span>Hi, {user.username}</span>
			</div>
			<div className="flex items-center gap-3">
				<Link to="/app">
					Panel
				</Link>
				<Link to="/app/products">
					Inventario
				</Link>
				<Link to="/app/invoices">
					Ventas
				</Link>
				<Link to="/auth/logout">
					Salir
				</Link>
			</div>
		</section>
	)
}