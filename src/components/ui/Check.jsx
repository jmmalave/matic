import {v4 as uuid_v4} from 'uuid'


export default function Check(props){
	
	const id = uuid_v4()
	
	return (
		<div className={`flex justify-between items-center ${props.disabled ? 'opacity-40' : ''}`}>
			<p className="truncate">{props.label}</p>
			
			<div onClick={() => !props.disabled && props.handleCheck()} className="rounded-full px-1 py-0.5 w-14 bg-white border-[1px] border-gray-300">
				<div
					className={`rounded-full h-[22px] w-[22px] ${props.checked ? 'bg-blue-500 translate-x-[25px]' : 'bg-gray-500'} duration-200`}
				/>
			</div>
		</div>
	)
	
}