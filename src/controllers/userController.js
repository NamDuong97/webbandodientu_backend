/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    // Điều hướng sang service xử lý
    const createdUser = await userService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    console.log(error)
    // dùng cái này để xử lý lỗi tập trung bởi middleware xử lý lỗi trong server.js - app.use(errorHandlingMiddleware)
    next(error)
  }
}

export const userController = {
  createNew
}