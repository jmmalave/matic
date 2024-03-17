import {useNavigate, useFetcher, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import useToastConfirm from '@/hooks/useToastConfirm'
import {Icon, Modal} from '@/components/ui'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import useKeepTouch from '@/hooks/useKeepTouch'


export default function Product(props){
	
	const fetcher = useFetcher()
	const [showModal, toggleModal] = useState(false)
	const confirmation = useToastConfirm()
	const navigate = useNavigate()
	
	function deleteProduct(){
		confirmation.loading('Eliminando producto...')
		
		fetcher.submit({ deleted: true }, {
			method: 'delete',
			action: `/app/products/${props.id}/delete`,
			encType: 'application/json'
		})
	}
	
	
	useEffect(function(){
		if( fetcher.state === 'loading' ){
			if( fetcher.data.done ){
				confirmation.resolve(`Se elimino el producto ${props.name}`)
			} else {
				let error = fetcher.data.error
				confirmation.reject(`Ups! Imposible eliminar el producto. Error: ${error}`)
			}
		}
	}, [fetcher])
	
	
	const [styles, api] = useSpring(
		() => ({touchAction: 'none', left: 0})
	)
	const [statePos, setStatePos] = useState(0)
	const bind = useDrag( state => {
		let {down, movement: [mx]} = state;
		let pos = statePos;
		
		if( down ){
			pos += mx
			pos = pos < 0 ? 0 : pos
			pos = pos > 128 ? 128 : pos
		} else {
			pos = statePos + mx
			pos = pos > 48 ? 96 : 0
			setStatePos(pos)
		}
		
		api.start({left: pos})
	})
	
	
	return <>
		<div className="w-full overflow-hidden relative h-[48px] border-b-gray-300 border-b-[1px] bg-gradient">
			<animated.div
				{...bind()}
				onClick={() => navigate(`/app/products/${props.id}`)}
				style={{...styles}}
				className="h-full w-full px-3 flex items-center justify-between absolute top-0 bg-white"
			>
				<p className="text-xl truncate">{props.name || 'Sin Nombre'}</p>
				{props.lowStock && (
					<span>
						Bajo stock
					</span>
				)}
			</animated.div>
			<div className="flex h-[48px] w-[96px] text-white">
				<button
					type="button"
					className="h-full flex-1"
					onClick={() => confirmation.confirm(
						<p>Quiere eliminar el producto <b>{props.name}</b> del inventario?</p>,
						() => deleteProduct()
					)}
				>
					<Icon name="trash" data-custom-color />
				</button>
				<button
					type="button"
					className="h-full flex-1"
					onClick={() => navigate(`/app/products/${props.id}/edit`)}
				>
					<Icon name="edit" data-custom-color />
				</button>
			</div>

		</div>
		
		<Modal
			type="bottom"
			show={showModal}
			changeState={toggleModal}
		>
			<Link to={`/app/products/${props.id}`} >
				Ver detalles
			</Link>
			<Link to={`/app/products/${props.id}/edit`}>
				Editar
			</Link>
			<Link>
				Eliminar
			</Link>
		</Modal>
	</>
}
