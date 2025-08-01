import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE : process.env.BUILD_MODE,
  AUTHOR: process.env.AUTHOR
}

// File này để tổng hợp toàn bộ biến môi trường từ file .env vào file này
// File này cho phép đẩy lên github để chia sẻ cùng mọi người