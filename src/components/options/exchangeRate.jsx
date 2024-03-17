import {Card, Input} from '@/components/ui'
import {useOptions} from '@/hooks/useOptions'
import {useDebouncedCallback} from 'use-debounce'
import {NumericFormat} from 'react-number-format'



export default function ExchangeRateComponent(){
	
	const [{exchangeRate} , updateOption] = useOptions({exchangeRate: 1})
	const debounced = useDebouncedCallback(
		(val) => updateOption('exchangeRate', val), 500
	)
	
	return (
		<div>
			<h3 className="text-xl mb-3">Tasa de cambio:</h3>
			<Input 
				value={exchangeRate}
				decimalScale={2}
				decimalSeparator="."
				suffix="Bs"
				onValueChange={values => debounced(values.floatValue)}
				placeholder="Tasa de cambio"
				as={NumericFormat}
				allowNegative={false}
			/>
		</div>
	)
}