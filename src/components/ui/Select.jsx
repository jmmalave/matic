import useClickEffect from '@/hooks/useClickEffect'
import {v4 as uuid_v4} from 'uuid'



export default function Select({
	children,
	containerClassName,
	selectClassName,
	labelClassName,
	invalid,
	error,
	placeholder,
	...props
}){
	
	const elRef = useClickEffect()
	props.id = props.id || uuid_v4()
	
	
	return (
		<div className={containerClassName}>
			<div
				ref={elRef}
				className={`
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
				<select
					{...props}
					data-current-value={props.value}
					className={`
						w-full 
						h-full 
						bg-transparent 
						px-6 
						pt-6 
						pb-2
						border-none 
						outline-none 
						text-lg
						appearance-none
					`}
				>
					{children}
				</select>
				<label 
					className={`
						absolute 
						left-0 
						px-6
					`} 
					htmlFor={props.id}
				>
					{placeholder}
				</label>
			</div>
			
			{invalid && (
				<small className="text-red-400">
					<i>{error}</i>
				</small>
			)}
		</div>
	)
}



Select.defaultProps = {
	containerClassName: "",
	invalid: false,
	error: "",
	placeholder: ""
}