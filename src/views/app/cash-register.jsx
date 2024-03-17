import {useState, useEffect} from 'react'
import {useFetcher} from 'react-router-dom'
import SearchProducts from '@/components/SearchProducts'
import {useFormik} from 'formik'
import {useOptions} from '@/hooks/useOptions'
import {Button, Switch, Check, Modal, Input} from '@/components/ui'
import Item from '@/components/InvoiceItem'
import AmountBox from '@/components/AmountBox'
import PaymentsEntries from '@/components/PaymentsEntries'
import Client from '@/components/InvoiceClient'
import {toast} from 'react-toastify'


export function Component(){
	
	const [currency, setCurrency] = useState('ves')
	const [showModal, setShowModal] = useState(false)
	const [{applyIva, exchangeRate}] = useOptions(
		{applyIva: 'product'}, 
		{exchangeRate: 1}
	)
	const fetcher = useFetcher()
	
	const formik = useFormik({
		initialValues: {
			client: {
				ci: '',
				name: '',
				phone: ''
			},
			products: [],
			isPaid: false,
			amountPaid: 0,
			payments: {
				pagoMovil: 0,
				tarjeta: 0,
				tarjetaCredito: 0,
				bioPago: 0,
				efectivo1: 0,
				efectivo2: 0
			},
			amount: 0,
			credit: false,
		},
		onSubmit: (values) => {
			
		}
	})
	
	const {
		values,
		setFieldValue: setValue,
		getFieldProps: fieldProps
	} = formik
	
	
	function addProduct(product){
		let price = product.prices[currency][0]?.price || 0
		
		if( applyIva == 'product' && product.iva > 0 ){
			price += (price * product.iva) / 100
		}
		
		if( product.allowSale ){
			setValue('products', 
				values.products.concat({
					id: product.id,
					name: product.name,
					price: price,
					units: 1,
					iva: product.iva,
					data: {...product, pricePos: 0}
				})
			)
		} else {
			toast.warning('Este producto no esta disponible para la venta')
		}
		
	}
	
	function removeProduct(index){
		values.products.splice(index, 1)
		setValue('products', values.products)
		calcInvoiceAmount()
	}
	
	
	function selectPrice(productIndex, priceIndex, value){
		setValue(`products[${productIndex}].price`, value)
		setValue(`products[${productIndex}].data.pricePos`, priceIndex) 
	}
	
	
	function changeUnits(productIndex, value){
		setValue(`products[${productIndex}].units`, value)
	}
	
	
	function calcInvoiceAmount(){
		let amount = 0
		
		switch(currency){
			case 'ves':
				
				for( let item of values.products ){
					let priceData
					let val = (item.price * 100) * item.units
					
					if( item.fixedPrice ){
						amount += val
					} else {
						amount += val * exchangeRate
					}
				}
				
				break;
			case 'usd':
			default:
			
				for(let item of values.products){
					amount += (item.price * 100) * item.units
				}
				
				break;
		}
		
		
		setValue('amount', amount / 100)
	}
	useEffect(calcInvoiceAmount, [values.products, currency])
	
	
	function calcAmountPaid(){
		
		let paymentsVES = [
			values.payments.pagoMovil,
			values.payments.bioPago,
			values.payments.tarjeta,
			values.payments.tarjetaCredito,
			values.payments.efectivo1,
		]
		let paymentsUSD = [
			values.payments.efectivo2
		]
		let amountUSD = 0
		let amountVES = 0
		
		for(let x of paymentsVES){
			if( !isNaN(x) ){
				amountVES += Number(x)
			}
		}
		
		for(let x of paymentsUSD){
			if( !isNaN(x) ){
				amountUSD += Number(x)
			}
		}
		
		if( currency == 'ves' ){
			amountUSD *= exchangeRate
		}
		
		if( currency == 'usd' ){
			amountVES /= exchangeRate 
		}
		
		setValue('amountPaid', (amountVES + amountUSD))
		setValue('')
	}
	useEffect(calcAmountPaid, [values.payments])
	
	function calcToPaid(amount, paid){
		let a = values.amount * 100
		let b = values.amountPaid * 100
		let r = (a-b) / 100
		
		return r
	}
	
	
	let $amount = values.amount
	let $toPaid = calcToPaid()
	let $change = 0
	
	if( $toPaid <= 0 ){
		$change = $toPaid * -1
		$toPaid = 0
	}
	
	return <>
		<div className="cash-register-view px-3">
			<div className="mb-3">
				<SearchProducts addProduct={addProduct} currency={currency} />
			</div>
			<div className="mb-1">
				<div className="flex justify-between gap-4">
					<div className="flex-1">
						<Switch 
							values={[
								{val: 'ves', element: 'VES'},
								{val: 'usd', element: 'USD'}
							]}
							currentValue={currency}
							selectOption={setCurrency}
						/>
					</div>
					<Button onClick={() => setShowModal(true)} >
						Proceder pago
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 mb-4">
				<AmountBox 
					values={[{amount: $amount, currency}]}
					label="Total"
					className="bg-green-600"
				/>
				<AmountBox 
					values={[{amount: $toPaid, currency}]}
					label="Falta pagar"
					className="bg-red-600"
				/>
			</div>
			
			{
				values.products.map((item, i) => (
					<Item 
						key={i}
						productIndex={i}
						values={item}
						currency={currency}
						removeProduct={removeProduct}
						selectPrice={selectPrice}
						changeUnits={changeUnits}
					/>
				))
			}
		</div>
		
		<Modal show={showModal} changeState={setShowModal}>
			<div className="grid gap-4">
				<section>
					<Client fieldProps={fieldProps} setValue={setValue} values={values} />
				</section>
				<section className="grid grid-cols-2 gap-2">
					<AmountBox 
						values={[
							{amount: currency == 'usd' ? $amount * exchangeRate : $amount, currency: 'ves'},
							{amount: currency == 'ves' ? $amount / exchangeRate : $amount, currency: 'usd'}
						]}
						label="Falta pagar"
						className="bg-green-600"
					/>
					<AmountBox 
						values={[
							{amount: currency == 'usd' ? $toPaid * exchangeRate : $toPaid, currency: 'ves'},
							{amount: currency == 'ves' ? $toPaid / exchangeRate : $toPaid, currency: 'usd'}
						]}
						label="Falta pagar"
						className="bg-red-600"
					/>
					<AmountBox 
						values={[
							{amount: currency == 'usd' ? $change * exchangeRate : $change, currency: 'ves'},
							{amount: currency == 'ves' ? $change / exchangeRate : $change, currency: 'usd'}
						]}
						label="Cambio"
						className="bg-blue-400"
					/>
				</section>
				<section className="grid gap-3">
					<PaymentsEntries 
						values={values}
						setValue={setValue}
					/>
				</section>
			</div>
		</Modal>
	</>
}
