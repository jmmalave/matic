import {useLoaderData, useSearchParams, Link} from 'react-router-dom'
import Product from '@/components/Product'
import {useState, useEffect, Suspense, lazy} from 'react'
import {Input, Modal, Icon} from '@/components/ui'
import {useDebounce} from 'use-debounce'
import CodeReader from '@/components/CodeReader'
import {useSoundAlert} from '@/hooks/useSoundAlert'



export function Component(){
	
	const data = useLoaderData()
	const [searchTerm, setSearchTerm] = useState("")
	const [searchParams, setSearchParams] = useSearchParams()
	const [__searchTerm] = useDebounce(searchTerm, 500)
	const [showCodeReader, toggleCodeReader] = useState(false)
	const sound = useSoundAlert()
	
	
	
	useEffect(function(){
		if( __searchTerm != "" ){
			setSearchParams({q: __searchTerm})
		}else if(searchParams.has('q')){
			setSearchParams({})
		}
	}, [__searchTerm])
	
	
	function captureHandle({rawValue}){
		setSearchTerm(rawValue)
		toggleCodeReader(false)
		sound.play()
	}
	
	
	return <>
		
		<div className="Inventary-View">
			<div className="px-2 mb-4">
				<Input 
					value={searchTerm}
					name="search"
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Buscar"
				>
					<Icon 
						name="qrcode" 
						onClick={() => toggleCodeReader(true)}
					/>
				</Input>
			</div>
				
			<div className="px-2 mb-4">
				<div className="flex justify-end items-center gap-4">
					<Link 
						to="/app/products/add" 
						className="btn btn-outline sm"
					>
						Nuevo Producto
					</Link>
					<Link 
						to="/app/products/categories" 
						className="btn btn-outline sm"
					>
						Categorias
					</Link>
				</div>
			</div>
			
			<div>
				<div className="grid">
					{data.products.map(item => <Product key={item.id} {...item} />)}
				</div>
			</div>
		</div>
		
		<Modal type="popup" show={showCodeReader} changeState={toggleCodeReader}>
			<CodeReader captureHandle={captureHandle} />
		</Modal>
	</>
}


export {loader} from '@/controllers/products/find'