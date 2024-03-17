import {createBrowserRouter} from 'react-router-dom'
import MainRoot from '@/layouts/root'
import AuthRoot from '@/layouts/auth-root'
import AppRoot from '@/layouts/dashboard-root'
import permaRedirect from '@/lib/permaRedirect'
import withAuthentication from '@/lib/withAuthentication'

export default createBrowserRouter([
	{
		path: '/',
		element: <MainRoot />,
		children: [
			{
				index: true,
				lazy: () => import('@/views/home')
			},
			{
				path: 'plans',
				lazy: () => import('@/views/plans')
			},
			{
				path: 'about',
				lazy: () => import('@/views/about')
			}
		]
	},
	{
		path: '/auth',
		element: <AuthRoot />,
		children: [
			{
				index: true,
				loader: permaRedirect('/auth', '/auth/login')
			},
			{
				path: 'login',
				lazy: () => import('@/views/auth/login')
			},
			{
				path: 'signup',
				lazy: () => import('@/views/auth/register')
			},
			{
				path: 'logout',
				lazy: () => import('@/controllers/auth/logout')
			}
		]
	},
	{
		path: '/app',
		element: <AppRoot/>,
		loader: withAuthentication(),
		children: [
			{
				index: true,
				lazy: () => import('@/views/app/home')
			},
			{
				path: 'products',
				children: [
					{
						index: true,
						lazy: () => import('@/views/app/inventary'),
					},
					{
						path: 'add',
						lazy: () => import('@/controllers/products/add')
					},
					{
						path: ':id',
						children: [
							{
								index: true,
								lazy: () => import('@/views/app/product-details'),
							},
							{
								path: 'edit',
								lazy: () => import('@/views/app/edit-product')
							},
							{
								path: 'delete',
								lazy: () => import('@/controllers/products/delete')
							}
						]
					},
					{
						path: 'search',
						lazy: () => import('@/controllers/products/search')
					}
				]
			},
			{
				path: 'invoices',
				lazy: () => import('@/views/app/invoices')
			},
			{
				path: 'cash-register',
				lazy: () => import('@/views/app/cash-register')
			},
			{
				path: 'settings',
				lazy: () => import('@/views/app/settings')
			}
		]
	}
], {
	basename: '/'
})
