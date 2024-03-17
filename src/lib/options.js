import {Option} from '@/db'


export default new Object({
	async get(...items){
		let result = {}
		for( let item of items ){
			let found = await Option.get(item)
			Object.assign(result, {
				[item]: found?.value
			})
		}
		return result
	},
	async set(name, value){
		if( undefined === value ){
			return await Option.where({name}).delete()
		} else {
			return await Option.put({name, value})
		}
	}
})
