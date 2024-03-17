import {Card, Switch} from '@/components/ui'
import {useOptions} from '@/hooks/useOptions'



export default function ApplyIvaComponent(){
	const [{applyIVA}, setOption] = useOptions({applyIVA: 'product'})
	
	return (
		<div>
			<h3 className="text-xl mb-3">Cobro del IVA:</h3>
			
			<Switch 
				currentValue={applyIVA}
				selectOption={(val) => setOption('applyIVA', val)}
				values={[
					{val: 'product', element: 'Agregar al producto'},
					{val: 'invoice', element: 'Descontar de la factura'}
				]}
			/>
			
			<p>Aplicar a facturas en:</p>
			<Switch 
				currentValue={'all'}
				values={[
					{val: "ves", element: "Bolivares"},
					{val: "usd", element: "Dolares"},
					{val: "all", element: "Todas"},
				]}
			/>
			
		</div>
	)
}