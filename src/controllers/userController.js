/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const getAlls = async (req, res, next) => {
  try {
    // Điều hướng sang service xử lý
    const users = await userService.getAlls()
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

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

const getDetails = async (req, res, next) => {
  try {
    console.log(req.body)
    const userId = req.params.id
    // Điều hướng sang service xử lý
    const user = await userService.getDetails(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const userController = {
  getAlls,
  createNew,
  getDetails
}