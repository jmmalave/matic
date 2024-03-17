import {useRouteError, isRouteErrorResponse} from 'react-router-dom'

import * as R from 'react-router-dom'
console.log(R)

export default function ErrorPage(){
	const error = useRouteError()
	
	
	if( !isRouteErrorResponse(error) ){
		return (
				<div>
					<div className="text-2xl">{error.name}</div>
					<div className="text-red-400">{error.message}</div>
				</div>
			)
	}
	
	
	return (
		<div className={`error-element error-status-${error.status}`}>
			
			<div className="flex mb-3 gap-3">
				<span className="text-4xl font-bold">{error.status}</span>
				<span className="text-2xl">|</span>
				<span className="text-2xl">{error.statusText}</span>
			</div>
			<div>
				{error.data}
			</div>
		</div>
	)
}