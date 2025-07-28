import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { ObjectId } from 'mongodb'
import { categoryModel } from './categoryModel'


const COLLECTION_NAME = 'Products'
const COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  categoryId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  price: Joi.number().required(),
  amount: Joi.number().required(),
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
    console.log('ObjectId:', id, '=>', new ObjectId(id))
    const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from: categoryModel.COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const productModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAlls,
  createNew,
  findOneById,
  getDetails
}