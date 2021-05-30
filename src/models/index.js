import mongoose from 'mongoose';

const DEV_DB_URL = "mongodb+srv://mcqApp:KeWjUVH33QxPaEgH@cluster0.qyo0g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


export default async function  dbConnectionInit () {
	try {
		await mongoose.connect(DEV_DB_URL, { useNewUrlParser: true });
		console.log('[DB] Database connected successfully !');
	} catch (e) {
		console.error('[DB] Mongoose connection failed', e);
	}
}