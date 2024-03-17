import {Input, Button, Modal, Icon, Info, Switch, Check} from '@/components/ui'
import {useState} from 'react'
import {NumericFormat} from 'react-number-format'
import {useOptions} from '@/hooks/useOptions'
import {useDebouncedCallback} from 'use-debounce'
import currentUser from '@/lib/currentUser'
import Price from '@/components/price'
import {v4 as genid} from 'uuid'



export default function EditPrices(formik){
	
	const [showModal, setShowModal] = useState(false)
	const [currency, setCurrency] = useState('usd')
	const {uid: userId} = currentUser.get()
	const [options, setOption] = useOptions(
		userId, 
		{exchangeRate: 1}
		
	)
	const userOptions = options[userId]
	
	
	function addPrice(){
		
		let defaultData = {
			id: genid(),
			price: "",
			concept: "",
			units: "",
		}
		
		
		Object.assign(
			formik.values.prices, {
				ves: formik.values.prices.ves.concat({...defaultData, fixedPrice: false}),
				usd: formik.values.prices.usd.concat(defaultData)
			}
		)
		
		formik.setFieldValue('prices', formik.values.prices)
	}
	
	
	function removePrice(index){
		formik.values.prices.ves.splice(index, 1)
		formik.values.prices.usd.splice(index, 1)
		formik.setFieldValue('prices', formik.values.prices)
	}
	
	
	function hideInfoForUser(){
		
		let data = userOptions
		
		if(Object.isObject(data)){
			Object.assign(data, {
				hideInfoCurrencyVES: true
			})
		} else {
			data = {hideInfoCurrencyVES: true}
		}
		setOption(userId, data)
	}
	
	
	return(
		<>
			<Modal 
				show={showModal} 
				changeState={setShowModal}
				type="bottom"
			>
				<div data-fixed>
					<Switch 
						currentValue={currency}
						selectOption={setCurrency}
						values={[
							{element: 'Dolares', val: 'usd'},
							{element: 'Bolivares', val: 'ves'}
						]}
					/>
				</div>
				
				{(
					!userOptions?.hideInfoCurrencyVES && 
					currency == 'ves'
				) && (
					<div className="mb-8">
						<Info>
							<p>El precio en Bolivares varía con relación a la tasa de cambio fijada en los ajustes. Fije el precio en Bolivares para establecer un monto fijo</p>
							<div className="mt-3">
								<Button
									onClick={hideInfoForUser}
									className="btn-outline btn-info sm">
									No volver a mostrar
								</Button>
							</div>
						</Info>
					</div>
				)}
			
			
				{formik.values.prices[currency].map((el, i) => (
					<div className="grid grid-cols-3 gap-3 mb-3" key={i}>
						
						<div className="col-span-3 px-6">
							<div className="flex justify-between items-center">
								
								<div className="text-lg font-bold">
									{`Precio ${i+1}:`}
								</div>
								
								<div className="flex gap-6 items-center">
									<button
										onClick={() => removePrice(i)}>
										<Icon name="trash-alt" data-size="md" />
									</button>
								</div>
								
							</div>
						</div>
						
						{currency == 'ves' && (
							<div className="col-span-3 px-6">
								<Check 
									label="Fijar precio en Bolivares"
									checked={el.fixedPrice}
									handleCheck={() => {
										formik.setFieldValue(`prices.ves[${i}].fixedPrice`, !el.fixedPrice)
									}}
								/>
							</div>
						)}
						
						
						{/*
						
							Campo de concepto
							
						*/}
						<Input
							value={el.concept}
							onChange={e => {
								formik.setFieldValue(`prices.usd[${i}].concept`, e.target.value)
								formik.setFieldValue(`prices.ves[${i}].concept`, e.target.value)
							}}
							placeholder="Descripción del precio"
							containerClassName="col-span-3"
						/>
						
						{/*
						
							Campo de precio
							
						*/}
						<div className="relative col-span-2">
							<Input 
								value={el.price}
								decimalScale={2}
								decimalSeparator="."
								prefix={!el.fixedPrice ? '$ ' : undefined}
								suffix={el.fixedPrice ? ' Bs' : undefined}
								onValueChange={({floatValue, value}) => {
									formik.setFieldValue(
										`prices[${currency}][${i}].price`, 
										floatValue || value
									)
								}}
								placeholder="Precio"
								as={NumericFormat}
							/>
							{currency == 'ves' && (
								<Price 
									value={el.fixedPrice ? el.price : el.price * options.exchangeRate} 
									suffix=" Bs" 
									prefix={!el.fixedPrice && '~ ' || undefined} 
									className="text-gray-200 text-xs bg-black p-1 rounded-full absolute top-[50%] translate-y-[-50%] right-3"
								/>
							)}
						</div>
						
						{/*
							
							Campo de unidades
							
						*/}
						<Input
							value={el.units}
							onChange={e => {
								formik.setFieldValue(`prices.usd[${i}].units`, e.target.value)
								formik.setFieldValue(`prices.ves[${i}].units`, e.target.value)
							}}
							type="number"
							placeholder="Unidades"
						/>
						
					</div>
				))}
			
				<div className="flex justify-end gap-3 mt-11">
					<Button onClick={addPrice}>
						Nuevo precio
					</Button>
					<Button 
						onClick={() => setShowModal(false)}
						className="bg-gray-200"
					>
						Cerrar
					</Button>
				</div>
			
			</Modal>
		
			<Button
				className="w-full md"
				onClick={() => setShowModal(true)}
			>
				Modificar, Agregar precios
			</Button>
		
		</>
	)
}

