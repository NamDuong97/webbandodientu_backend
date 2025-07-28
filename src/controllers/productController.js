/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const getAlls = async (req, res, next) => {
  try {
    // Điều hướng sang service xử lý
    const products = await productService.getAlls()
    res.status(StatusCodes.OK).json(products)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    // Điều hướng sang service xử lý
    const createdProduct = await productService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (error) {
    console.log(error)
    // dùng cái này để xử lý lỗi tập trung bởi middleware xử lý lỗi trong server.js - app.use(errorHandlingMiddleware)
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    console.log(req.body)
    const productId = req.params.id
    // Điều hướng sang service xử lý
    const product = await productService.getDetails(productId)
    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const productController = {
  getAlls,
  createNew,
  getDetails
}