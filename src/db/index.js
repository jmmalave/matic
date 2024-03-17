import Dexie from 'dexie'

const dbName = 'MaticDB-client-demo';
const conn = new Dexie(dbName);

conn.version(1).stores({
	Product: `&id, name, *codes, *prices, iva, allowSale, stock, lowStock, lowStockThreshold, deleted, created, lastUpdate`,
	Invoice: `&id, client, *products, amount, isPaid, totalPaid, date`,
	Option: `&name, value`,
	Client: `&ci, name, phone`,
	Session: `&sid, uid, active`,
	User: `&uid, username, password, role`
})

export const Client = conn.Client
export const Invoice = conn.Invoice
export const Option = conn.Option
export const Product = conn.Product
export const User = conn.User
export const Session = conn.Session

export default conn