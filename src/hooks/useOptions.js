import {useLiveQuery} from 'dexie-react-hooks'
import optionsQuery from '@/lib/options'


export function useOptions(..._keys){
	let defaults = {}
	let names = []
	
	for(let key of _keys){
		if( Object.isObject(key) ){
			let [name, defaultValue] = Object.keyValue(key)
			Object.assign(defaults, {[name]: defaultValue})
			names.push(name)
		} else if ( typeof key == 'string' ){
			names.push(key)
		}
	}
	
	let stmt = () => optionsQuery.get(...names)
	let result = useLiveQuery(stmt, [], defaults)
	
	async function setOption(name, value){
		return await optionsQuery.set(name, value)
	}
	
	
	for(let key of Object.keys(result)){
		let value = result[key]
		result[key] = value != undefined ? value : defaults[key]
	}
	
	return [result, setOption]
}