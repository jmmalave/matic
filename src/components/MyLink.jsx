import {Link, NavLink} from 'react-router-dom'


export default function  MyLink({children, nav, ...props}){
	if( 'href' in props ){
		
		if( typeof props.className == 'function' ){
			props.className = props.className({})
		}
		
		return (
			<a {...props}>{children}</a>
		)
	}
	
	let Element = nav ? NavLink : Link
	
	return (
		<Element {...props}>{children}</Element>
	)
}


MyLink.defaultProps = {
	nav: false
}