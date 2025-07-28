import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { categoryValidation } from '~/validations/categoryValidation'
import { categoryController } from '~/controllers/categoryController'

const Router = express.Router()

Router.route('/')
  .get(categoryController.getAlls)
// Gọi arrow function chứ k thực thi, khi nào client gọi tới ms thực thi
// route post này gọi validation dữ liệu trong validation này có điều hướng sang controller rồi
  .post(categoryValidation.createNew, categoryController.createNew)

Router.route('/:id')
  // Không có dữ liệu gửi lên do vậy không cần gọi validation ở đây
  .get(categoryController.getDetails)

export const categoryRoute = Router
