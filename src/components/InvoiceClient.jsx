import {Input} from '@/components/ui'
import {NumericFormat} from 'react-number-format'
import {Client} from '@/db'
import {useEffect} from 'react'
import {useDebounce} from 'use-debounce'


export default function InvoiceClient({
	fieldProps, 
	setValue,
	values
}){
	
	const [debouncedTerm] = useDebounce(values.client.ci, 400)
	useEffect(() => {
		async function fetchClient(){
			if( debouncedTerm ){
				let clientData = await Client.where({ci: debouncedTerm}).first()
				if( clientData ){
					setValues("client", clientData)
				}
			}
		}
		fetchClient()
	}, [debouncedTerm])
	
	return <>
		<h3 className="text-xl mb-3">Cliente</h3>
		<div className="grid grid-cols-2 gap-3">
			<div className="col-span-2">
				<Input 
					{...fieldProps('client.ci')}
					type="number"
					placeholder="Documento de identidad"
				/>
			</div>
			<div className="col-span-1">
				<Input 
					{...fieldProps('client.name')}
					placeholder="Nombre"
				/>
			</div>
			<div className="col-span-1">
				<Input 
					value={values.client.phone}
					placeholder="Telefono"
					as={NumericFormat}
					allowNegative={false}
					decimalScale={0}
					onValueChange={({floatValue}) => setValue('client.phone', floatValue)}
				/>
			</div>
		</div>
	</>
}