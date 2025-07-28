import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productValidation } from '~/validations/productValidation'
import { productController } from '~/controllers/productController'

const Router = express.Router()

Router.route('/')
  .get(productController.getAlls)
// Gọi arrow function chứ k thực thi, khi nào client gọi tới ms thực thi
// route post này gọi validation dữ liệu trong validation này có điều hướng sang controller rồi
  .post(productValidation.createNew, productController.createNew)

Router.route('/:id')
  // Không có dữ liệu gửi lên do vậy không cần gọi validation ở đây
  .get(productController.getDetails)

export const productRoute = Router
