import {useState, useEffect, createElement} from 'react'
import {v4 as uuidV4} from 'uuid'
import useClickEffect from '@/hooks/useClickEffect'
import Icon from './icon'


export default function Input({
	error, 
	invalid, 
	placeholder, 
	children, 
	tips,
	containerClassName,
	inputClassName,
	labelClassName,
	as,
	...props
}){
	
	const [showTips, toggleTips] = useState(false)
	const [showEffect, setShowEffect] = useState(false)
	const elRef = useClickEffect()
	
	
	if( undefined != tips && Array.isArray(tips) ){
		let infoBtn = (
			<button 
				onFocus={() => toggleTips(true)}
				onBlur={() => toggleTips(false)}
				type="button"
				key="btnInfo"
			>
				<Icon name="info-circle" data-size="md" />
			</button>
		)
		
		if( children ){
			if(Array.isArray(children)){
				children = children.concat(infoBtn)
			}else{
				children = [children, infoBtn]
			}
		} else {
			children = infoBtn
		}
	}
	
	if( !props.id ){
		props.id = uuidV4()
	}
	
	const Entry = createElement(as || 'input', {
		...props,
		className: `
			${inputClassName} 
			flex-1 
			h-full 
			bg-transparent 
			px-6 
			pt-6 
			pb-2 
			border-none 
			outline-none 
			text-lg
			min-w-0
		`,
		'data-current-value': String(props.value)
	}, null)
	
	
	return(
		<div className={`${containerClassName} relative`} >
			<div 
				ref={elRef}
				className={`
					flex 
					gap-2 
					rounded-full 
					border-[1px] 
					border-gray-500 
					${invalid ? 'bg-red-200' : ''} 
					relative 
					h-[56px] 
					w-full 
					overflow-hidden 
					duration-200
					wp-input
				`}
			>
				{Entry}
				{!!placeholder && <label 
					className={`
						${labelClassName} 
						absolute 
						left-0 
						px-6 
						duration-200
					`} 
					htmlFor={props.id}
				>
					{placeholder}
				</label>}
				
				{children && (
					<div className="h-full px-4 bg-gray-100">
						<div className="h-full w-full flex gap-4 items-center">
							{children}
						</div>
					</div>
				)}
				
				
			</div>
			
			{invalid && (
				<small className="text-red-400">
					<i>{error}</i>
				</small>
			)}
			
			{ Array.isArray(tips) && (
				<ul className={`tips-bubble ${!showTips && 'hide'}`}>
					{tips.map((tip, i) => <li key={i}>{tip}</li>)}
				</ul>
			)}
			
		</div>
	)
}


Input.defaultProps = {
	invalid: false,
	error: "",
	containerClassName: "",
	inputClassName: "",
	labelClassName: "",
	as: null
}