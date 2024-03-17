import {Outlet, Link} from 'react-router-dom'
import Logo from '@/components/Logo'



export default function AuthLayout(){
	return (
		<div className="px-4 py-4">
			<div className="flex justify-between mb-8">
				<div>
					<Link to="/">
						<Logo/>
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<Link to="/auth/login">
						Ingresar
					</Link>
					<Link to="/auth/signup" className="btn btn-outline">
						Crear cuenta
					</Link>
				</div>
			</div>
			<main>
				<div className="w-full max-w-2xl mx-auto">
					<Outlet/>
				</div>
			</main>
		</div>
	)
}