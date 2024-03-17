import {useFormik} from 'formik'
import * as yup from 'yup'
import {useFetcher} from 'react-router-dom'

import {
	Card,
	Input,
	Button
} from '@/components/ui'


export {action, loader} from '@/controllers/auth/login'


export function Component(){
	const fetcher = useFetcher()
	const formik = useFormik({
		initialValues: {
			user: "",
			password: ""
		},
		validationSchema: yup.object().shape({
			user: yup.string()
				.required("Ingrese su usuario"),
			password: yup.string()
				.required("La contraseña es requerida")
		}),
		onSubmit: (values) => {
			fetcher.submit(values, {
				method: 'post',
				encType: 'application/json'
			})
		}
	})
	
	let isLoading = fetcher.state != 'idle'
	
	return (
		<div className="view-login">
			<Card className="shadow-gray-500 shadow-2xl">
				<h2 className="card-title">Iniciar sesión</h2>
				<br />
				<form onSubmit={formik.handleSubmit}>
					<Input 
						{...formik.getFieldProps('user')}
						placeholder="Usuario o correo"
						invalid={formik.errors.user && formik.touched.user}
						error={formik.errors.user}
					/>
					<br/>
					<Input 
						{...formik.getFieldProps('password')}
						placeholder="Contraseña"
						type="password"
						invalid={formik.errors.password && formik.touched.password}
						error={formik.errors.password}
					/>
					<br/>
					<Button
						type="submit"
						disabled={isLoading}
						useLoading
					>
						Ingresar
					</Button>
				</form>
			</Card>
		</div>
	)
}

