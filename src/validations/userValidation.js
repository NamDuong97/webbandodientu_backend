/* eslint-disable no-console */
/* eslint-disable indent */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


// Bắt validation của post request sau đó chuyển hướng sang controller để xử lý
const createNew = async (req, res, next) => {
        // Cấu hình validation dữ liệu bằng thư viện Joi
        const correctCondition = Joi.object({
            userName: Joi.string().required().min(3).max(50).trim().strict().messages({
                'any.required' : 'userName la bat buoc',
                'any.empty': 'userName khong duoc de rong',
                'any.min': 'userName toi thieu 3 ky tu',
                'any.max': 'userName toi da 50 ky tu',
                'any.trim': 'userName khong duoc co khoang trong o dau'
            }),
            passWord: Joi.string().required().min(3).max(50).trim().strict()
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

// Xuất ra tất cả validation để của bảng user để sử dụng trong userRoute.js
export const userValidation = {
   createNew
}