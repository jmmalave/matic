import {Icon, Modal, Button} from '@/components/ui'
import {useState, useEffect} from 'react'
import {useOptions} from '@/hooks/useOptions'
import Price from '@/components/price'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import {NumericFormat} from 'react-number-format'



export default function Invoice({
	values, 
	removeProduct, 
	selectPrice, 
	changeUnits, 
	productIndex, 
	currency
}){
	
	const [showModal, toggleModal] = useState(false)
	const [{exchangeRate}] = useOptions(['exchangeRate'], {exchangeRate: 1})
	const currenciesSign = {
		ves: ' Bs',
		usd: '$'
	}
	
	
	function increment(){
		changeUnits(productIndex, values.units + 1)
	}
	
	function reduce(){
		if( values.units <= 1 ){
			return
		}
		
		changeUnits(productIndex, values.units - 1)
	}
	
	
	function inputUnitsHandleBlur(){
		if(values.units <= 0 || !values.units) {
			changeUnits(productIndex, 1)
		}
	}
	
	const [{moveX}, api] = useSpring(() => ({moveX: 0}))
	const bind = useDrag(({down, movement: [mx]}) => {
		
		if( (mx < 0 ? mx * -1 : mx) >= 200 && !down ){
			setTimeout(() => removeProduct(productIndex), 600);
		}
		
		api.start({moveX: down ? mx : 0})
	})
	
	
	let $price = values.price
	let $pricesList = values.data.prices[currency]
	
	if( currency == 'ves' ){
		$price *= exchangeRate
	}
	
	useEffect(function(){
		toggleModal(true)
	}, [])
	
	return <>
	
		<animated.article 
			onClick={() => toggleModal(true)} 
			{...bind()}
			style={{x: moveX, touchAction: 'none'}}
			className={`flex justify-between p-2 border-b-2 border-gray-300`}
		>
			<div className="truncate flex-1">
				<span>{values.name}</span>
			</div>
			<div className="flex items-center gap-1">
				<Price 
					value={$price}
					suffix={currenciesSign[currency]}
				/>
				<span>x</span>
				<span className="w-[28px]">
					{values.units }
				</span>
			</div>
		</animated.article>
		
		
		<Modal 
			show={showModal}
			changeState={toggleModal} 
		>
			<div className="mb-4">
				<h4 className="mb-2 text-xl">Precios:</h4>
				
				
				<div className="grid grid-cols-2 gap-2">
					{$pricesList.map((data, priceIndex) => (
						<div 
							key={data.id} 
							className={`border-[1px] duration-300 ${values.price === data.price ? 'border-blue-400 shadow-md shadow-blue-200' : 'border-gray-300'} p-3 rounded`}
							onClick={() => selectPrice(productIndex, priceIndex, data.price)}
						>
							<p>{data.concept}</p>
							{currency == 'ves' ? <>
								<div className="flex gap-1">
									<Price 
										value={data.fixedPrice ? data.price : (data.price * exchangeRate)} 
										suffix="Bs"
										className="text-bold" />
									<span>x{data.units}</span>
								</div>
								{!data.fixedPrice && (
									<div className="flex gap-1">
										<Price 
											value={data.price} 
											suffix="$"
											className="text-bold" />
										<span>x{data.units}</span>
									</div>
								)}
							</> : <>
								<div className="flex gap-1">
									<Price 
										value={data.price} 
										suffix="$"
										className="text-bold" />
									<span>x{data.units}</span>
								</div>
							</>}
						</div>
					))}
				</div>
				
			</div>
			
			<div className="mb-10">
				<h4 className="mb-2 text-xl">Unidades:</h4>
				<div className="flex items-center gap-4">
					<Btn handleClick={reduce}>
						<Icon name="minus" />
					</Btn>
					<NumericFormat 
						value={values.units}
						allowNegative={false}
						decimalScale={0}
						onValueChange={({floatValue}) => changeUnits(productIndex, floatValue)}
						onBlur={inputUnitsHandleBlur}
						className="outline-none border-[1px] border-gray-300 bg-white text-center w-[62px] h-[38px] rounded-full"
					/>
					<Btn handleClick={increment}>
						<Icon name="plus" />
					</Btn>
				</div>
			</div>
			<div className="flex justify-end">
				<Button
					onClick={() => toggleModal(false)}
				>
					Cerrar
				</Button>
			</div>
		</Modal>
	</>
}


function Btn({children, handleClick}){
	return(
		<button
			type="button"
			className="w-[38px] h-[38px] rounded-full bg-white shadow text-xl"
			onClick={handleClick}
		>
			{children}
		</button>
	)
}