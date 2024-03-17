import {Icon, Input, Modal} from '@/components/ui'
import {useState, useEffect} from 'react'
import CodeReader from '@/components/CodeReader'
import {useSoundAlert} from '@/hooks/useSoundAlert'


export default function EditCodes(formik){
	
	const [showModal, setShowModal] = useState(false)
	const [value, setValue] = useState("")
	const sound = useSoundAlert()

	
	function captureBarcodeHandle({rawValue}){
		
		if( formik.values.codes.indexOf(rawValue) === -1 ){
			let newValue = formik.values.codes.concat(rawValue)
			formik.setFieldValue('codes', newValue)
			setValue(newValue.join(', '))
			setShowModal(false)
		}
		
		sound.play()
	}
	
	function handleChange(e){
		let val = e.target.value
		setValue(val)
		formik.setFieldValue('codes', val.replaceAll(' ', '').split(','))
	}
	
	function removeCode(i){
		formik.values.codes.splice(i, 1)
		formik.setFieldValue('code', formik.values.codes)
		setValue(formik.values.codes.join(', '))
	}
	
	useEffect(function(){
		setValue(formik.values.codes.join(', '))
	}, [formik.values.codes])
	
	return (
		<>
		
			<Modal 
				show={showModal} 
				changeState={setShowModal}
				type="popup">
				<CodeReader 
					captureHandle={captureBarcodeHandle}
					style={{height: '50%'}}
				/>
			</Modal>
		
			<Input
				value={formik.values.codes.join(', ')}
				onChange={handleChange}
				placeholder="Codigo del producto"
				tips={[
					"Puedes agregar mas de un codigo para identificar varias presentaciones de un mismo producto",
					"Para añadir mas codigos solo debes separarlos por `,`"
				]}
			>
				<button onClick={() => setShowModal(true)} >
					<Icon name="qrcode" data-size="md" />
				</button>
			</Input>
			<div className={`px-3 ${formik.values.codes.length > 0 ? 'mt-2' : ''}`}>
				<div className="flex flex-wrap gap-1">
					{formik.values.codes.map((code, i) => code === "" ? null : (
						<div className="bg-gray-200 rounded-full overflow-hidden text-sm" key={i}>
							<span className="py-1 pr-2 pl-3 whitespace-nowrap">{code}</span>
							<button className="py-1 px-2 bg-gray-300" onClick={() => removeCode(i)} >
								<Icon name="times" data-size="sm" />
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	)
}