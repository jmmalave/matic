import {useRef, useEffect} from 'react'


let isAppend = false
export default function useClickEffect(){
	
	const ref = useRef(null)
	
	
	useEffect(() => {
		
		if( !ref.current ){
			return null
		}
		
		function appendElement(e){
			let element = document.createElement('span')
			let _this = ref.current
			
			element.classList.add('click-effect')
			element.style.top = e.offsetY + 'px';
			element.style.left = e.offsetX + 'px';
			
			if( isAppend ){
				return;
			}
			
			isAppend = true
			_this.appendChild(element)
			setTimeout(function() {
				_this.removeChild(element)
				isAppend = false
			}, 300);
			
		}
		
		ref.current.addEventListener("click", appendElement)
	}, [ref.current])
	
	
	return ref
	
}