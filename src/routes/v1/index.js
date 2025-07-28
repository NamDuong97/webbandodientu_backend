/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'
import { productRoute } from './productRoute'
import { categoryRoute } from './categoryRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 are ready to use' })
})

Router.use('/users', userRoute)
Router.use('/products', productRoute)
Router.use('/categories', categoryRoute)

export const APIs_V1 = Router