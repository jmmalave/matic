
if( window.Object.isObject === undefined ){
	window.Object.isObject = function(value){
		return value instanceof this && !window.Array.isArray(value)
	}
}


(function(_c){
	let handlers = ([
		{
			key: 'isObject',
			value: function isObject(_val){
				return (
					typeof _val == 'object' &&
					_val instanceof _c &&
					!Array.isArray(_val)
				)
			}
		},
		{
			key: 'hasProperty',
			value: function hasProperty(_obj, _key){
				return (
					this.isObject(_obj) && 
					_c.prototype.hasOwnProperty.call(_obj, _key)
				)
			}
		},
		{
			key: 'keyValue',
			value: function keyValue(_obj){
				let k = _c.keys(_obj)
				let v = _c.values(_obj)
				
				return [ k[0], v[0] ]
			}
		}
	])
	
	function mapToClass({key, value}){
		if( _c[key] === void(0) ){
			_c[key] = value
		}
	}
	
	Array.prototype.map.call(handlers, mapToClass)
})(Object)