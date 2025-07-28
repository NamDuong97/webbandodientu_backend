import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


// Bắt validation của post request sau đó chuyển hướng sang controller để xử lý
const createNew = async (req, res, next) => {
        // Cấu hình validation dữ liệu bằng thư viện Joi
        const correctCondition = Joi.object({
            name: Joi.string().required().min(3).max(100).trim().strict().messages({
                'string.base': 'Tên danh mục phải là chuỗi',
                'string.empty': 'Tên danh mục không được để trống',
                'string.min': 'Tên danh mục phải có ít nhất 3 ký tự',
                'string.max': 'Tên danh mục không được vượt quá 100 ký tự',
                'any.required': 'Trường tên danh mục là bắt buộc'
            }),
            description: Joi.string().max(500).allow('', null).messages({
                'string.max': 'Mô tả không được vượt quá 500 ký tự'
            }),
            status: Joi.string().valid('Hiển thị', 'Ẩn').default('Hiển thị').messages({
                'any.only': 'Trạng thái phải là "Hiển thị" hoặc "Ẩn"'
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

// Xuất ra tất cả validation để của bảng category để sử dụng trong categoryRoute.js
export const categoryValidation = {
   createNew
}