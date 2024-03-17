import Icon from './icon'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import {useOptions} from '@/hooks/useOptions'
import useKeepTouch from '@/hooks/useKeepTouch'
import {useState, useRef} from 'react'

Modal.defaultProps = {
	changeModalState: function(){},
	showModal: false,
	type: 'top'
}


export function Modal(props){
	
	function handleClick(e){
		e.stopPropagation()
		props.changeState(prev => !prev)
	}
	
	
	if(!props.show){
		return null
	}
	
	const ModalContent = ({
		top: ModalTop,
		bottom: ModalBottom,
		popup: ModalPopup
	})[props.type]
	
	return <ModalContent 
		children={props.children} 
		handleClick={handleClick} 
	/>
}


function ModalBottom({children, handleClick}){
	
	const elements = []
	const elementsFixed = []
	
	for(let el of children){
		if( Object.isObject(el) && Object.hasProperty(el.props, 'data-fixed') && el.props['data-fixed'] === true ){
			elementsFixed.push(el)
		} else {
			elements.push(el)
		}
	}
	
	
	return (
		<div 
			className="fixed top-[68px] left-0 w-screen h-[calc(100vh-68px)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm z-40"
			onClick={handleClick}
		>
			<div 
				className="flex items-end h-full w-full"
			>
				<div
					onClick={e => e.stopPropagation()} 
					className="bg-white rounded-t-3xl p-4 shadow-2xl w-full max-w-2xl mx-auto" 
				>
					<div className="flex justify-end mb-3">
						<button onClick={handleClick}>
							<Icon name="times" />
						</button>
					</div>
					<div>
						{elementsFixed}
					</div>
					<div className="max-h-[70vh] w-100 overflow-y-scroll pb-6">
						{elements}
					</div>
				</div>
			</div>
		</div>
	)
}


function ModalTop({children, handleClick}){
	return (
		<div 
			className="fixed top-[68px] left-0 w-screen h-[calc(100vh-68px)] bg-[rgba(0,0,0,0.45)] backdrop-blur-sm z-40"
			onClick={handleClick}
		>
			<div 
				className="p-6 w-full"
			>
				<div
					onClick={e => e.stopPropagation()} 
					className="bg-white rounded-3xl p-4 shadow-2xl w-full max-w-2xl mx-auto" 
				>
					<div className="flex justify-end mb-3">
						<button onClick={handleClick}>
							<Icon name="times" />
						</button>
					</div>
					<div className="max-h-[70vh] w-100 overflow-y-scroll pb-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}



function ModalPopup({children, handleClick}){
	
	// positions margin
	const MarginT =  88
	const MarginB = 30
	const MarginX = 20
	
	// Screen dimensions
	const ScreenW = window.innerWidth
	const ScreenH = window.innerHeight
	
	// modal container ref
	const targetRef = useRef()
	
	// Modal Popup current position
	// mpp: modal popup position
	const defaults = localStorage.getItem('MPP_Defaults')
	const [defaultTop, defaultLeft] = defaults ? JSON.parse(defaults) : [MarginT, MarginX]
	const [options, setOption] = useOptions({mpp: [defaultTop, defaultLeft]})
	const [CurrentTop, CurrentLeft] = options.mpp
	
	const [styles, api] = useSpring(() => ({top: CurrentTop, left: CurrentLeft}), [options.modalFloatPosition])
	const bind = useDrag(({down, movement: [mx, my], direction: [dx, dy], ...rest}) => {
		let target = targetRef.current
		let $ew = target.offsetWidth
		let $eh = target.offsetHeight
		let MaxTop = MarginT
		let MaxLeft = ScreenW - MarginX - $ew
		let MaxBottom = ScreenH - MarginB - $eh
		let left = CurrentLeft
		let top = CurrentTop
		
		
		if( dy === -1 ){
			top = top - (my * -1)
		} else {
			top = top + my
		}
		
		if( dx === -1 ){
			left = left - (mx * -1)
		} else {
			left = left + mx
		}
		
		if( down ){
			
			if( left <= MarginX ){
				left = MarginX
			}
			
			if( left >= MaxLeft ){
				left = MaxLeft
			}
			
			if( top <= MarginT ){
				top = MarginT
			}
			
			if( top <= MaxTop ){
				top = MaxTop
			}
			
			if( top >= MaxBottom ){
				top = MaxBottom
			}
			
		} else {
	
			if( top >= (ScreenH / 2) ){
				top = MaxBottom
			} else {
				top = MarginT
			}
			
			if( left >= (ScreenW / 2) ){
				left = MaxLeft
			} else {
				left = MarginX
			}
			
			localStorage.setItem('MPP_Defaults', JSON.stringify([top, left]))
			setOption('mpp', [top, left])
		}
		
		api.start({left, top})
	})
	
	
	return (
		<animated.div 
			className="fixed w-[52vw] h-[42vh] z-40"
			ref={targetRef}
			style={styles}
		>
			<div
				className="bg-white rounded-3xl shadow-2xl shadow w-full h-full overflow-hidden" 
			>
				<div 
					className="flex justify-between px-4 py-2 text-2xl text-white" 
				>
					<button
						style={{touchAction: 'none'}} 
						{...bind()}
					>
						<Icon name="arrows-alt" />
					</button>
					<button 
						onClick={handleClick}
					>
						<Icon name="times" />
					</button>
				</div>
				<div>
					{children}
				</div>
			</div>
		</animated.div>
	)
}


