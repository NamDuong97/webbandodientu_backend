/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// import ApiError from "~/utils/ApiError"

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }
    // Xu ly logic goi repository o day hoac cac logic khac
    return newUser
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew
}