import Price from './price'


export default function AmountBox(props){
	
	const currenciesSigns = {
		usd: '$',
		ves: 'Bs'
	}
	
	return (
		<div className={`${props.className} text-white p-4 rounded-xl`}>
			<div className="flex flex-col items-center">
				<p>{props.label}</p>
				{props.values.map((item, i) => (
					<Price 
						key={i}
						value={item.amount} 
						suffix={currenciesSigns[item.currency]} 
					/>
				))}
			</div>
		</div>
	)
}