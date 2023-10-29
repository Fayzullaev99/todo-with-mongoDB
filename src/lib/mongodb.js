import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URL

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

let client
let clientPromise

if (!process.env.MONGODB_URL) {
    throw new Error("check .env.local file")
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(url, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(url, options)
    clientPromise = client.connect()
}
client = new MongoClient(url, options)
clientPromise = client.connect()
clientPromise.then(()=>console.log('linked to DB'))
export default clientPromise

