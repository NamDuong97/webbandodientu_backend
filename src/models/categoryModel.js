import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { productModel } from './productModel'


const COLLECTION_NAME = 'Categories'
const COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(50).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const getAlls = async () => {
  try {
    const result = await GET_DB().collection(COLLECTION_NAME).find().toArray();
    return result || []
  } catch (error) {
    throw new Error(error)
  }
} 

const validateBeforeCreate = async (data) => {
  return await COLLECTION_SCHEMA.validateAsync(data, { abortEarly : false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdProduct = await GET_DB().collection(COLLECTION_NAME).insertOne(validData)
    return createdProduct
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id) // Bắt buộc phải là objectId nếu là string sẽ sai
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from: productModel.COLLECTION_NAME,
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const categoryModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAlls,
  createNew,
  findOneById,
  getDetails
}