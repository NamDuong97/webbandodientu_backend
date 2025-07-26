
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API get all user' })
  })
// Gọi arrow function chứ k thực thi, khi nào client gọi tới ms thực thi
// route post này gọi validation dữ liệu trong validation này có điều hướng sang controller rồi
  .post(userValidation.createNew, userController.createNew)

export const userRoute = Router

