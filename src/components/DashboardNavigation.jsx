import MyLink from '@/components/MyLink'
import currentUser from '@/lib/currentUser'


const navLinks = [
	{
		name: "Panel",
		to: "/app",
		allowedRoles: "admin:collaborator",
	},
	{
		name: "Productos",
		to: "/app/products",
		allowedRoles: "admin"
	},
	{
		name: "Agregar producto",
		to: "/app/products/add",
		allowedRoles: "admin"
	},
	{
		name: "Ventas",
		to: "/app/invoices",
		allowedRoles: "admin:collaborator"
	},
	{
		name: "Caja registradora",
		to: "/app/cash-register",
		allowedRoles: "admin:collaborator"
	},
	{
		name: "Usuarios",
		to:"/app/users",
		allowedRoles: "admin"
	},
	{
		name: "Ajustes",
		to: "/app/settings",
		allowedRoles: "*"
	},
	{
		name: "Salir",
		to: "/auth/logout",
		allowedRoles: "*"
	},
]


export default function DashboardNav(){
	const user = currentUser.get()
	
	return (
		<nav className="flex flex-col gap-1">
		{navLinks.map(({allowedRoles, name, ...rest}) => {
			if( '*' === allowedRoles || allowedRoles.split(':').indexOf(user?.role) > -1){
				return (
					<MyLink 
						{...rest}
						key={name}
						end={true}
						nav
						className={({isActive}) => `
							flex-1 
							py-2 
							px-3 
							duration-200 
							text-[1.25em]
							rounded-full
							${isActive ? 'bg-blue-500 text-white' : ''}
						`}
					>
						{name}
					</MyLink>
				)
			}
			
			return null
			
		})}
		</nav>
	)
}