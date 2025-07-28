/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// import ApiError from "~/utils/ApiError"
import { categoryModel } from '~/models/categoryModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAlls = async () => {
  try {
    const categories = await categoryModel.getAlls()
    return categories
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
    const createdUser = await categoryModel.createNew(newUser)
    const getNewUser = await categoryModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) {
    throw error
  }
}

const getDetails = async (id) => {
  try {
    const category = await categoryModel.getDetails(id)
    console.log('category hien tai la: ', category)
    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'category not found')
    }
    return category
  } catch (error) {
    throw error
  }
}

export const categoryService = {
  getAlls,
  createNew,
  getDetails
}