//username: weblinhkiendientu123
//password: te8MiWDIUvmGn8rw
import { MongoClient, ServerApiVersion } from "mongodb" 
import { env } from "./environment"

let webbanlinhkiendientuDbInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

// Tạo kết nối với mongodb
export const CONNECT_BD = async () => {
    // kết nối với mongodb atlas với uri đã khai báo
    await mongoClientInstance.connect()
    // Kết nối thành công thì lấy ra database dự án gán vào biến webbanlinhkiendientuDbInstance
    webbanlinhkiendientuDbInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Lấy ra db cần làm
export const GET_DB = () =>{
    if(!webbanlinhkiendientuDbInstance) throw new Error('hay ket noi toi db truoc')
        return webbanlinhkiendientuDbInstance
}

// Đóng kết nối DB
export const CLOSE_DB = async () =>{
   await mongoClientInstance.close()
}