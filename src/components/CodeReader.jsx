import {BarcodeScanner, useTorch} from 'react-barcode-scanner'
import {useEffect, useState} from 'react'


CodeReader.defaultProps = {
	width: '100%',
	height: '160px'
}


export default function CodeReader(props){
	
	const [isSupportedTorch, isOpenTorch, onSwichTorch] = useTorch()
	const [result, setResult] = useState(null)
	
	
	useEffect(function(){
		if( result?.rawValue ){
			props.captureHandle(result)
			setTimeout(setResult, 700);
		}
	}, [result])
	
	
	useEffect(function(){
		return () => {
			isOpenTorch && onSwichTorch();
		}
	}, [isOpenTorch])
	
	
	return (
		<div 
			className={`relative overflow-hidden ${props.className}`} 
			style={props.style}>
			<BarcodeScanner 
				className="w-full h-full"
				options={{
					delay: 500,
					formats: ['ean_13', 'ean_8', 'qr_code']
				}}
				onCapture={setResult}
			/>
			
			<div className="absolute top-5 left-5 right-5 bottom-5">
				<div className="barcode-reader">
					<div className="border-l"></div>
					<div className="reader-bar"></div>
					<div className="border-r"></div>
				</div>
			</div>
			
			{ isSupportedTorch 
				? (
					<button
						onClick={onSwichTorch}
						className="absolute bottom-4 left-[calc(50%-14px)] w-[28px] h-[28px] rounded-full shadow-md bg-white text-gray-600"
					>
						<span 
							className={`icon-flash_${isOpenTorch ? 'off' : 'on'}`}>
						</span>
					</button>
				)
				: null
			}
		</div>
	)
}
