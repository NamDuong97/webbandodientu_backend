import express from 'express'
import { CONNECT_BD, GET_DB, CLOSE_DB} from './config/mongodb' 
import exitHook  from 'async-exit-hook'
import {env} from  './config/environment'
const START_SERVER = () =>{
  const app = express()

  app.get('/', async (req, res) => {
    // Test Absolute import mapOrder
    // eslint-disable-next-line no-console
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

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
