import {Check} from '@/components/ui'
import {Product} from '@/db'
import {useLoaderData} from 'react-router-dom'
import {useState} from 'react'

export default function SaleState(){
	
	const {item} = useLoaderData()
	const [checked, setChecked] = useState(item.allowSale)
	
	function changeState(){
		Product.where({id: item.id}).modify({allowSale: !checked})
		setChecked(prev => !prev)
	}
	
	return (
		<div>
			<Check 
				checked={checked}
				label="Disponible para la venta"
				handleCheck={changeState}
			/>
		</div>
	)
	
}