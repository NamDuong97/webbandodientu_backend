import express from 'express'
import { CONNECT_BD, GET_DB, CLOSE_DB} from './config/mongodb' 
import exitHook  from 'async-exit-hook'
import {env} from  './config/environment'
import {APIs_V1} from '~/routes/v1'
import {errorHandlingMiddleware}  from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () =>{
  const app = express()

  // Bật req.body json data
  app.use(express.json())

  // Sử dụng api v1
  app.use('/v1', APIs_V1)

  // middleware xử lý lỗi tập trung, tất cả các phần catch mà dùng next(error) thì nó sẽ vào middleware này
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(async (signal) =>{
    console.log('da dong ket noi mongodb')
    await CLOSE_DB()
  })
}

// Kiểm tra kết nối mongodb và start server
(async () =>{
  try {
    console.log('dang ket noi mongodb')
    await CONNECT_BD()
    console.log('da ket noi mongodb')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Kết nối tới mongodb cách 2
// CONNECT_BD()
// .then(() =>{
//   console.log('da ket noi mongodb atlas')
// })
// .then(() => START_SERVER())
// .catch(error => {
//     console.error(error)
//     process.exit(0)
// })
