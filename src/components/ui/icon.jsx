

export default function Icon({name, weight, className, ...props}){
	return (
		<span 
			className={`icon ${weight} fa-${name} ${className}`}
			{...props} 
		/>
	)
}


Icon.defaultProps = {
	className: "",
	name: "",
	weight: "far"
}