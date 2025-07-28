import Joi from 'joi'

const USER_COLLECTION_NAME = 'Categories'
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(50).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

export const categoryModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA
}