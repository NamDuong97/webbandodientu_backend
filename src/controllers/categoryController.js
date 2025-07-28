/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const getAlls = async (req, res, next) => {
  try {
    // Điều hướng sang service xử lý
    const categories = await categoryService.getAlls()
    res.status(StatusCodes.OK).json(categories)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    // Điều hướng sang service xử lý
    const createdCategory = await categoryService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdCategory)
  } catch (error) {
    console.log(error)
    // dùng cái này để xử lý lỗi tập trung bởi middleware xử lý lỗi trong server.js - app.use(errorHandlingMiddleware)
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    console.log(req.body)
    const categoryId = req.params.id
    // Điều hướng sang service xử lý
    const category = await categoryService.getDetails(categoryId)
    res.status(StatusCodes.OK).json(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const categoryController = {
  getAlls,
  createNew,
  getDetails
}