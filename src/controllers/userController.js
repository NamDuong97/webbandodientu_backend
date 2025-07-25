
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
      try {
            console.log(req.body)
            res.status(StatusCodes.CREATED).json({message: 'From controller API create use'})
        }catch (error) {
            console.log(error)
            next(error) // dùng cái này để xử lý lỗi tập trung
        }
}

export const userController = {
   createNew
}  