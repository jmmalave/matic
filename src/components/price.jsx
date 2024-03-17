import {numericFormatter} from 'react-number-format'


export default function DisplayPrice({suffix, prefix, value, ...props}){
	const numeric = numericFormatter(value.toString(), {
		decimalScale: 2,
		fixedDecimalScale: true,
		decimalSeparator: ".",
		suffix: suffix,
		prefix: prefix
	})
	
	return <span {...props}>{numeric}</span>
}