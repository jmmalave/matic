import { NavLink, Link, useLocation, Await } from 'react-router-dom'
import {useState, useEffect} from 'react'
import currentUser from '@/lib/currentUser'
import Logo from '@/components/Logo'
import {Icon} from '@/components/ui'


const links = [
	{
		name: "Inicio",
		path: "/"
	},
	{
		name: "Planes",
		path: "/plans"
	},
	{
		name: "Nosotros",
		path: "/about"
	},
]

const authLinks = [
	{
		name: 'Ingresar',
		path: '/auth/login'
	},
	{
		name: 'Crear cuenta',
		path: '/auth/signup'
	}
]


export default function Navigation(){
	
	const [show, toggle] = useState()
	const {pathname} = useLocation()
	
	
	useEffect(() => {
		toggle(false)
	}, [pathname])
	
	
	return <>
		<div className="h-[68px] px-3 bg-white flex items-center justify-between shadow z-[51] relative">
			<Link to="/">
				<Logo />
			</Link>
			
			<button 
				onClick={() => toggle(prev => !prev)}
				className="w-11 h-11 bg-gray-200 rounded"
			>
				<Icon name="bars" data-size="lg" />
			</button>
		</div>
				
		{show && (
			<div className="fixed top-[calc(42px+68px)] h-[calc(100vh-(42px+68px))] left-0 w-screen py-6 px-11 backdrop-blur z-50" onClick={() => toggle(false)} >
				<div className="bg-white rounded-2xl p-4 shadow-xl" onClick={e => e.stopPropagation()}>
					<ul className="list-none flex grid m-0 p-0 gap-2 text-[1.1srem]">
						{
							links.map(el => (
								<li key={el.name}>
									<NavLink 
										to={el.path}
										className={({isActive}) => `
											block 
											p-3
											rounded-[6px] 
											text-center
											${isActive ? 'bg-blue-500 text-white' : ''}
										`}
									>
										{el.name}
									</NavLink>
								</li>
							))
						}
						{
							!currentUser.has() && authLinks.map(el => (
								<li key={el.name}>
									<Link to={el.path} className="block p-3 text-center">
										{el.name}
									</Link>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		)}
			
	</>
}