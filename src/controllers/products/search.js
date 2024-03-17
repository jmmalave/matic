import {Product} from '@/db'
import {json} from 'react-router-dom'
import {toast} from 'react-toastify'


export async function loader({request}){
	try {
		let {searchParams} = new URL(request.url)
		let term = searchParams.get('q')
		
		let products = await Product.filter(doc => {
				
				if( doc.deleted ){
					return null
				}
				
				let textMatch = filterSearch(doc, term)
				let score = 0
				
				if( textMatch ){
					score = textScore(textMatch, term)
				}
				
				doc.score = score
				return doc.score >= .7
				
			})
			.reverse()
			.sortBy('score')
		let count = products.length
		
		return json({products, count})
		
	} catch (e) {
		toast.error(`Error: ${e.message}`)
		return json({products: [], count: 0})
	}
}



function filterSearch(doc, term){

	let reg = new RegExp(`${term.split(' ').join('|')}`, 'i')
	
	if( reg.test(doc.name) ){
		return doc.name
	} else if( doc.codes.indexOf( term ) > -1 ){
		return doc.codes.find(c => c === term)
	}
	
	return false
}


function textScore(value, term){
	
	value = value.toLowerCase().trim()
	term = term.toLowerCase().trim()
	
	let keyWords = term.split(' ')
	let words = value.split(' ')
	let score = 0
	
	// evalua fragmentos del string
	for(let key of keyWords){
		if( key.length >= 3 && value.indexOf(key) > -1 ){
			score += .2
		}
	}
	
	// evalua que contenga palabras exactas en el string
	for(let key of keyWords){
		if( key.length >= 3 && words.indexOf(key) > -1 ){
			score += .5
		}
	}
	
	// evalua si las key words tienen un mismo orden que en el string
	if( keyWords.length > 1 ){
		
		for( let index in keyWords ){
			let i1 = Number(index)
			let i2 = words.indexOf( keyWords[i1] )
			
			if( keyWords[i1+1] === words[i2+1] ){
				score += .5
			} else {
				break;
			}
		}
	}
	
	// evalua si el string y las key words coinciden totalmente
	if(term === value){
		score += 1
	}
	
	return score
}