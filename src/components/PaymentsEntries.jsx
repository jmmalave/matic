import {NumericFormat} from 'react-number-format'
import {Input} from '@/components/ui'


const entries = [
	{method: 'pagoMovil', sign: 'Bs', label: 'Pago Movil'},
	{method: 'bioPago', sign: 'Bs', label: 'Bio Pago'},
	{method: 'tarjeta', sign: 'Bs', label: 'Tarjeta'},
	{method: 'tarjetaCredito', sign: 'Bs', label: 'Tarjeta de credito'},
	{method: 'efectivo1', sign: 'Bs', label: 'Efectivo 1'},
	{method: 'efectivo2', sign: '$', label: 'Efectivo 2'},
]


export default function PaymentsEntries({values: {payments}, setValue}){
	
	
	return entries.map(({method, sign, label}, index) => (
		<Input 
			key={index}
			as={NumericFormat}
			value={payments[method]}
			suffix={sign}
			placeholder={label}
			decimalScale={2}
			allowNegative={false}
			onValueChange={({floatValue}) => {
				setValue(`payments[${method}]`, floatValue)
			}}
			data-current-value={String(payments[method])}
		/>
	))
}