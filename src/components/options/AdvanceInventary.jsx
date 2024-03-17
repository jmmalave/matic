import {useOptions} from '@/hooks/useOptions'
import {Check} from '@/components/ui'


export default function AdvanceInventary(){
	
	
	const [options, setOption] = useOptions(
		{useAdvanceInventary: false},
		{allowSalesWithoutStock: false},
	)
	
	return (
		<div>
			<h3 className="text-xl mb-3">Inventario:</h3>
			
			<div className="grid gap-2">
				<Check 
					checked={
						options.useAdvanceInventary
					}
					handleCheck={() => setOption(
						'useAdvanceInventary', 
						!options.useAdvanceInventary
					)}
					label="Habilitar modulo de inventario avanzado"
				/>
				<Check
					checked={
						options.useAdvanceInventary
						 ? options.allowSalesWithoutStock
						 : false
					}
					disabled={!options.useAdvanceInventary}
					handleCheck={() => setOption(
						'allowSalesWithoutStock', 
						!options.allowSalesWithoutStock
					)}
					label="Permitir ventas con el inventario en cero"
				/>
			</div>
		</div>
	)
}