/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const USER_COLLECTION_NAME = 'Users'
const USER_COLLECTION_SCHEMA = Joi.object({
  userName: Joi.string().required().min(3).max(50).trim().strict(),
  passWord: Joi.string().required().min(3).max(50).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly : false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return createdUser
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id) // Bắt buộc phải là objectId nếu là string sẽ sai
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id) // Bắt buộc phải là objectId nếu là string sẽ sai
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}

// Trong model thao tác với CSDL rồi mà vẫn cần validate, lý do là khi coder xử lý dữ liệu ở tầng service gây ra lỗi thì trước
// khi cập nhật vào csdl dữ liệu sẽ valid 1 lần nữa để chặn dữ liệu bị lỗi 