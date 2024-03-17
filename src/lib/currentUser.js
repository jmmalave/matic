

export default new Object({
	sessName: 'CURRENT_USER_LOGIN',
	storage: window.sessionStorage,
	set(data)
	{
		this.storage.setItem(
			this.sessName,
			JSON.stringify(data)
		)
	},
	delete()
	{
		this.storage.removeItem(this.sessName)
	},
	get()
	{
		let data = this.storage.getItem(this.sessName)
		return JSON.parse(data)
	},
	has()
	{
		return Object.isObject(this.get())
	}
})
