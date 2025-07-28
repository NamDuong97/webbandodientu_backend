import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'


// Bắt validation của post request sau đó chuyển hướng sang controller để xử lý
const createNew = async (req, res, next) => {
        // Cấu hình validation dữ liệu bằng thư viện Joi
        const correctCondition = Joi.object({
            name: Joi.string().required().min(3).max(100).trim().strict().messages({
                'string.base': 'Tên sản phẩm phải là chuỗi',
                'string.empty': 'Tên sản phẩm không được để trống',
                'string.min': 'Tên sản phẩm phải có ít nhất 3 ký tự',
                'string.max': 'Tên sản phẩm không được vượt quá 100 ký tự',
                'any.required': 'Trường tên sản phẩm là bắt buộc',
            }),
            categoryId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            price: Joi.number().min(0).required().messages({
                'number.base': 'Giá phải là số',
                'number.min': 'Giá không được nhỏ hơn 0',
                'any.required': 'Giá là bắt buộc',
            }),
            amount: Joi.number().integer().min(0).required().messages({
                'number.base': 'Số lượng phải là số nguyên',
                'number.min': 'Số lượng không được âm',
                'any.required': 'Số lượng là bắt buộc',
            })
        })

        try {
            console.log(req.body)
            // abortEarly = false để xuất ra hết lỗi, chứ k dừng lại ở lỗi đầu , kiểm tra validation
            await correctCondition.validateAsync(req.body, { abortEarly : false })
            //để chuyển xử lý sang controller
            next()
        } catch (error) {
            const errorMessage = new Error(error).message
            const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
            next(customError) // gọi middleware báo lỗi tập trung trong server.js
        }
    }

// Xuất ra tất cả validation để của bảng product để sử dụng trong productRoute.js
export const productValidation = {
   createNew
}