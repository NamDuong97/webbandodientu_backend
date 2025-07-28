/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// import ApiError from "~/utils/ApiError"
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }
    // Xu ly logic goi repository o day hoac cac logic khac
    const createdUser = await userModel.createNew(newUser)
    const getNewUser = await userModel.findOneById(createdUser.insertedId)
    return getNewUser
  } catch (error) {
    throw error
  }
}

const getDetails = async (id) => {
  try {
    const user = await userModel.getDetails(id)
    console.log('user hien tai la: ', user)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'user not found')
    }
    return user
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  getDetails
}