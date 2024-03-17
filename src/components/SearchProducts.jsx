import {useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import {Input, Icon, Switch} from '@/components/ui'
import CodeReader from '@/components/CodeReader'
import {useSoundAlert} from '@/hooks/useSoundAlert'
import {useFetcher} from 'react-router-dom'
import {useOptions} from '@/hooks/useOptions'




export default function SearchProducts(props){
	
	const fetcher = useFetcher()
	const [products, setProducts] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [showResultsContainer, toggleResultsContainer] = useState(false)
	const [debouncedSearchTerm] = useDebounce(searchTerm, 680)
	const [searchInput, setSearchInput] = useState('term')
	const sound = useSoundAlert()
	const [{exchangeRate}] = useOptions(['exchangeRate'], {exchangeRate: 0})
	
	

	function loadHandle(term){
		fetcher.load(
			`/app/products/search?q=${term}`
		)
	}
	
	
	function captureHandle({rawValue}){
		if(rawValue && fetcher.state == 'idle'){
			loadHandle(rawValue)
			sound.play()
		}
	}
	
	
	function handleClick(product){
		props.addProduct(product)
		setSearchTerm('')
		setProducts([])
	}
	
	
	useEffect(function(){
		let term = debouncedSearchTerm
		if(term != ""){
			loadHandle(term)
		} else {
			setProducts([])
		}
	}, [debouncedSearchTerm])
	
	
	useEffect(function(){
		if( fetcher.state == 'idle' && !!fetcher.data ){
			if( searchInput == 'barcode' && fetcher.data.count === 1 ){
				props.addProduct(
					fetcher.data.products[0]
				)
			} else {
				if( !isNaN(Number(debouncedSearchTerm)) ){
					let amount = Number(debouncedSearchTerm)
					
					fetcher.data.products.unshift({
						name: `Articulos varios`,
						prices: {
							[props.currency]: [{
								concept: 'Articulos varios',
								price: amount,
								units: 1,
								fixedPrice: true
							}],
						},
						iva: 0,
						allowSale: true
					})
				}
				setProducts( fetcher.data.products )
			}
		}
	}, [fetcher])
	
	
	return (
		<div className="SearchProducts">
		
			<Switch
				values={[
					{element: iconSearch, val: 'term'},
					{element: iconScanner, val: 'barcode'}
				]}
				currentValue={searchInput}
				selectOption={setSearchInput}
			/>
			
			{
				searchInput == 'barcode' && (
					<CodeReader 
						captureHandle={captureHandle}
						style={{height: '105px'}}
					/>
				)
			}
			
			{
				searchInput == 'term' && (
					<div className="relative">
						<Input 
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							children={<Icon name="search" />}
							onFocus={() => toggleResultsContainer(true)}
							placeholder="Buscar producto"
							name="search"
						/>
						
						{!!searchTerm && (
							<div className="p-4 grid gap-3 bg-white shadow rounded absolute w-full top-[60px] z-10">
								{products.length === 0 ?
									<div>Sin resultados</div>
								:
									products.map((p, i) => (
										<article 
											key={i} 
											onClick={() => handleClick(p)}
											className="flex justify-between"
										>
											<span>{p.name}</span>
											<span>{p.price}</span>
										</article>
									))
								}
							</div>
						)}
					</div>
				)
			}
		
		</div>
	)
	
}


const iconSearch = <Icon name="search" data-custom-color className="text-xl" />
const iconScanner = <Icon name="scanner" data-custom-color className="text-xl" />