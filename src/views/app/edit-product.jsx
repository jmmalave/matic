import {useEffect, useState} from 'react'
import {useLoaderData, useFetcher, Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import {Input, Button, Select, Check} from '@/components/ui'
import {useOptions} from '@/hooks/useOptions'
import EditCodes from '@/components/edit-products/Codes'
import EditPrices from '@/components/edit-products/Prices'
import SaleState from '@/components/edit-products/SaleState'


export {loader} from '@/controllers/products/findById'
export {action} from '@/controllers/products/update'

export function Component(){
	
	const {item} = useLoaderData()
	const fetcher = useFetcher()
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			...item
		}, 
		onSubmit: (values) => {
			fetcher.submit(values, {
				method: 'post',
				encType: 'application/json'
			})
		}
	})
	const [options] = useOptions('useAdvanceInventary')
	
	
	return(
		<div className="EditProduct">
			
			<div className="flex justify-end gap-2 mb-4 px-4">
				<Link 
					className="btn btn-outline sm"
					to="/app/products">
					Productos
				</Link>
			</div>
			
			
			<div className="grid gap-4 px-4">
				<h3 className="text-2xl">Editar producto:</h3>
				
				<SaleState />
				
				<div>
					<Input 
						{...formik.getFieldProps('name')}
						placeholder="Nombre del producto"
					/>
				</div>
				
				<div>
					<EditCodes {...formik} />
				</div>
				
				<div>
					<EditPrices {...formik} />
				</div>
				
				<div>
					<Input 
						{...formik.getFieldProps('iva')}
						type="number"
						placeholder="IVA"
					/>
				</div>
				
				<div>
					<Input 
						{...formik.getFieldProps('stock')}
						type="number"
						placeholder="Unidades en inventario"
					/>
				</div>
				
				{options.useAdvanceInventary && <>
					<div>
						<Input 
							{...formik.getFieldProps('lowStockThreshold')}
							placeholder="Limite de inventario bajo"
							tips={[
								"Puede establecer un limite para indicar cundo el stock del producto sea bajo"
							]}
						/>
					</div>
				</>}

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						onClick={formik.handleSubmit}
						disabled={fetcher.submitting}
						useLoading={true}
					>
						Guardar
					</Button>
				</div>
				
			</div>
		</div>
	)
}
