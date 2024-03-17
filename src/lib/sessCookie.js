import cookie from 'cookie-cutter'


export default new Object({
	cookie_name: 'SESSID',
	set(id)
	{
		cookie.set(this.cookie_name, id, {path: '/'})
	},
	get()
	{
		return cookie.get(this.cookie_name)
	},
	delete()
	{
		cookie.set(this.cookie_name, null, {path: '/', expires: new Date(0)})
	},
	has()
	{
		return !!this.get()
	}
})