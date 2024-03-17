import {Outlet, useLocation} from 'react-router-dom'
import currentUser from '@/lib/currentUser'
import Navigation from '@/components/DashboardNavigation'
import {useState, useEffect, Suspense} from 'react'
import Logo from '@/components/Logo'
import {Icon} from '@/components/ui'


export default function AppRoot(){
	
	const user = currentUser.get()
	const {pathname} = useLocation()
	const [showSide, setShowSide] = useState(false)
	
	function toggleSide(show=null){
		setShowSide(prev => show === null ? false : !prev)
	}
	
	
	useEffect(toggleSide, [pathname])
	
	
	return (
		<div className="DashboardRoot relative w-screen h-screen">
			
			{/*
			
				Root header 
				
			*/}
			<header className="bg-white shadow-md fixed top-0 left-0 w-screen h-[68px] z-50">
				<div className="px-4 w-full h-full flex items-center justify-between">
					<div className="flex items-center gap-x-8">
						<Logo />
						{/* btn toggle sidebar */}
						<Icon 
							name="bars"
							className="fa-2x"
							onClick={() => toggleSide(true)}
						/>
					</div>
					{currentUser.has() &&	(
					<div className="flex items-center gap-x-4">
						<div className="rounded-full w-[36px] h-[36px] bg-vibrant flex items-center justify-center text-2xl text-white font-medium justify-center" >
							{user.username[0]}
						</div>
						<span>{user.username}</span>
					</div>
					)}
				</div>
			</header>
			
			{/*
			
				Root sidebar
			
			*/}
			<div 
				className={`z-[998] w-screen h-[calc(100vh-68px)] fixed top-[68px] left-0 ${showSide ? 'visible bg-[rgba(0,0,0,0.45)] backdrop-blur' : 'hidden'}`}
				onClick={() => toggleSide(false)}
			/>
			
			<aside className={`z-[999] fixed top-[calc(68px+32px)] ${showSide ? 'left-[20px] duration-300 delay-100' : 'left-[-100vw] duration-300'}`}>
				<div className={`bg-white w-[54vw] max-w-[288px] shadow-2xl rounded-2xl p-3`}>
					<section className="py-4">
						<Navigation />
					</section>
				</div>
			</aside>
			
			{/*
			
				Root content
			
			*/}
			<main className="w-screen h-screen pt-20">
				<div className="py-4 max-w-2xl mx-auto">
					<Suspense fallback={"Cargando vista..."}>
						<Outlet />
					</Suspense>
				</div>
			</main>
		</div>
	)
	
}