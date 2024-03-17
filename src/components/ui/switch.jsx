import useClickEffect from '@/hooks/useClickEffect'
import {v4 as uuid_v4} from 'uuid'


export default function Switch(props){
	
	let id = uuid_v4()
	
	return(
		<div className="flex mb-5 switches overflow-hidden">
			{props.values.map(item => (
				<div key={item.val} className="flex-1">
					<input 
						type="radio"
						name={`switch-${id}`}
						defaultValue={item.val}
						onChange={() => props.selectOption(item.val)}
						checked={props.currentValue === item.val}
						id={item.val}
						hidden
					/>
					<label
						htmlFor={item.val}
						ref={useClickEffect()}
						className="h-[44px] w-full flex justify-center items-center relative overflow-hidden"
					>
						{item.element}
					</label>
				</div>
			))}
		</div>
	)
}