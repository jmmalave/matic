import {Spin} from './spinner'
import useClickEffect from '@/hooks/useClickEffect'


export function Button({children, className, useLoading, ...props}){
	
	const elRef = useClickEffect()
	const showSpinner = useLoading && props.disabled
	
	return (
		<button 
			{...props}
			className={`btn ${className} relative overflow-hidden`}
			ref={elRef}
			tabIndex="-1"
		>
			{children}
			{showSpinner && <Spin/>}
		</button>
	)
}


Button.defaultProps = {
	useLoading: false
}