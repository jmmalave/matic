import __logo from '@/img/logo.png'


export default function Logo({width, height}){
	
	return(
		<img 
			src={__logo}
			width={width}
			height={height}
		/>
	)
}

Logo.defaultProps = {
	width: 42,
	height: 42
}