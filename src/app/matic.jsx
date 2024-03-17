import '@/lib/polyfills/Object'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import routes from '@/router/router'
import {ToastContainer} from 'react-toastify'
import db from '@/db'


// styles
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/main.scss'

// Open database
db.open()

// Render app when connecting
db.on('ready', function(){
	
	const container = document.getElementById('root')
	const root = ReactDOM.createRoot(container)
	
	root.render(
		<React.StrictMode>
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				draggable={true}
				pauseOnHover={false}
				theme="light"
				staked
			/>
			<RouterProvider router={routes} />
		</React.StrictMode>
	)
})
