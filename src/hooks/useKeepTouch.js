import {useDrag} from '@use-gesture/react'



let intervalHandle;

export default function useKeepTouch(_handle, _times){
	
	const bind = useDrag(state => {
		if( state.down ){
			
			let timeLeft = _times || 800
			let called = false
			
			intervalHandle = setInterval(() => {
				if( timeLeft > 0 ){
					timeLeft -= 100
				} else if( !called) {
					_handle()
					called = true
					clearInterval(handleCalled)
				}
			}, 100)
			
		} else {
			clearInterval(intervalHandle);
			intervalHandle = null;
		}
	})
	
	return bind()
}