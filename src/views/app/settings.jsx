import ExchangeRate from '@/components/options/exchangeRate' 
import ApplyIVA from '@/components/options/applyIVA'
import AdvanceInventary from '@/components/options/AdvanceInventary'


export function Component( ){
	return (
		<div className="settings-view">
			<div className="grid gap-8 p-3">
				<ExchangeRate />
				<ApplyIVA />
				<AdvanceInventary />
			</div>
		</div> 
	)
}