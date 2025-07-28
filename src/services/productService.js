/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// import ApiError from "~/utils/ApiError"
import { productModel } from '~/models/productModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAlls = async () => {
  try {
    const products = await productModel.getAlls()
    return products
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }
    // Xu ly logic goi repository o day hoac cac logic khac
    const createdUser = await productModel.createNew(newUser)
    const getNewUser = await productModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) {
    throw error
  }
}

const getDetails = async (id) => {
  try {
    const product = await productModel.getDetails(id)
    console.log('product hien tai la: ', product)
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product not found')
    }
    return product
  } catch (error) {
    throw error
  }
}

export const productService = {
  getAlls,
  createNew,
  getDetails
}