import {Outlet} from 'react-router-dom'
import {Suspense} from 'react'
import Footer from '@/components/Footer'
import Navigation from '@/components/MainNavigation'
import AppBar from '@/components/AppBar'
import currentUser from '@/lib/currentUser'


function Root(){
	
	return(
		<div className="Root">
			{currentUser.has() && <AppBar />}
			<Navigation />
			<main className="sm:px-6 px-2.5 py-10 max-w-2xl mx-auto">
				<Suspense fallback={<span>Loading...</span>}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</div>
	)
}


export default Root