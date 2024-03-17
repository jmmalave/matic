import {toast} from 'react-toastify'
import {useRef, useState, useEffect} from 'react'
import {v4 as uuidV4} from 'uuid'
import {Button} from '@/components/ui'
import {useNavigation} from 'react-router-dom'


export default function useToastConfirm(){
	
	const toastId = useRef(null)
	const navigation = useNavigation()
	
	useEffect(function(){
		
		if(
			navigation.state === 'loading' &&
			navigation.location.pathname != window.location.pathname
		) dismissConfirmation()
		
	}, [navigation])
	
	
	function confirm(msg, handleAction){
		if( isEmpty() ){
			toastId.current = toast(
				<div>
					<div className="mb-2">{msg}</div>
					<div className="flex justify-end gap-2">
						<Button onClick={handleAction} className="bg-gray-200">
							Confirmar
						</Button>
						<Button onClick={dismissConfirmation}>
							Cancelar
						</Button>
					</div>
				</div>,
				{
					toastId: uuidV4(),
					autoClose: false,
					closeButton: false,
					icon: false,
					draggable: false
				}
			)
		}
	}
	
	
	function finishAction(msg, type = toast.TYPE.DEFAULT){
		
		let options = {
			type: type,
			render: msg,
			icon: true
		}
		
		if( 'default' != type ){
			Object.assign(options, {
				closeButton: true,
				autoClose: true,
				draggable: true
			})
		}
		
		toast.update(toastId.current, options)
	}
	
	
	function resolve(msg){
		finishAction(msg, toast.TYPE.SUCCESS)
	}
	
	function reject(msg){
		finishAction(msg, toast.TYPE.ERROR)
	}
	
	function loading(msg){
		finishAction(msg)
	}
	
	function dismissConfirmation(e){
		toast.dismiss( toastId.current )
	}
	
	function isEmpty(){
		return !toast.isActive( toastId.current )
	}
	
	return {
		confirm,
		loading,
		resolve,
		reject,
		emptyConfirmation: isEmpty(),
		dismiss: dismissConfirmation
	}
	
}