import {useFormik} from 'formik'
import * as yup from 'yup'
import {useFetcher} from 'react-router-dom'


import {
	Card as CardForm,
	Button as BtnAction,
	Input as FormEntry
} from '@/components/ui'


export {loader, action} from '@/controllers/auth/signup'

export function Component(){
	
	
	const fetcher = useFetcher()
	const formik = useFormik({
		initialValues: {
			user: "",
			password: "",
			confirm_password: "",
		},
		validationSchema: yup.object().shape({
			user: yup.string()
				.required("Nombre de usuario requerido")
				.matches(/^[a-z0-9].+$/i, "Solo se permiten letras y numeros"),
			password: yup.string()
				.required("La contraseña es requerida")
				.min(6, "La contraseña debe ser igual o mayor a 6 caracteres"),
			confirm_password: yup.string()
				.required("La confirmación de la contraseña es requerida")
				.oneOf([yup.ref('password')], "Las contraseñas no coinciden"),
		}),
		onSubmit: (values) => {
			fetcher.submit(values, {
				method: 'post',
				encType: 'application/json'
			})
		}
	})
	
	let isSubmitting = fetcher.state != 'idle'
	return (
		<section className="view-register">
			<CardForm className="shadow-2xl shadow-gray-100">
				<form onSubmit={formik.handleSubmit} >
					
					<h2 className="text-3xl text-center">Crear cuenta de usuario</h2>
					<br />
					<FormEntry 
						{...formik.getFieldProps('user')}
						invalid={formik.errors.user && formik.touched.user}
						error={formik.errors.user}
						placeholder="Nombre de usuario"
					/>
					<br/>
					<FormEntry 
						{...formik.getFieldProps('password')}
						invalid={formik.errors.password && formik.touched.password}
						error={formik.errors.password}
						type="password"
						placeholder="Contraseña"
					/>
					<br/>
					<FormEntry 
						{...formik.getFieldProps('confirm_password')}
						invalid={formik.errors.confirm_password && formik.touched.confirm_password}
						error={formik.errors.confirm_password}
						type="password"
						placeholder="Confirmar contraseña"
					/>
					<br/>
					<BtnAction
						type="submit"
						disabled={isSubmitting}
						useLoading
					>
						Continuar
					</BtnAction>
				</form>
			</CardForm>
		</section>
	)
}