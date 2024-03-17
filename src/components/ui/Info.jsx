import {useState} from 'react'
import Icon from '@/components/ui/icon'


export default function Info({children}){
	
	const [showInfo, setShowInfo] = useState(true)
	
	if( !showInfo ){
		return null
	}
	
	
	return(
		<div className="bg-blue-100 text-muted p-3 flex gap-3 rounded-md">
			<div className="flex-1">
				<Icon
					name="info-circle"
					className="text-muted mr-2"
					data-custom-color
				/>
				{children}
			</div>
			<Icon
				name="times-circle"
				className="text-muted text-[1.25rem]"
				onClick={() => setShowInfo(false)}
				data-custom-color
			/>
		</div>
	)
}