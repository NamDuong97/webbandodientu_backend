# webbandodientu_backend
day la api nodejs danh cho web ban linh kien dien tu

# next() và next(error) khác nhau thế nào
next() là middleware để chuyển tiếp bước xử lý tiếp theo
next(error) next mà có giá trị thì mặc định chuyển tiếp tới middleware xử lý lỗi

# npm i joi: đây là thư viện để validation các dữ liệu request gửi lên server giống modelState của .net vậy
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

# npm i http-status-codes: đây là thư viện quản lý status code trả về cho client biết phản hồi của server

# class ApiError để custom class Error của hệ thống truyền vào mã lỗi và tin nhắn báo lỗi
const errorMessage = new Error(error).message
const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
next(customError) // gọi middleware báo lỗi tập trung trong server.js

# errorHandlingMiddleware là 1 middleware - 1 arrow function để trả về mã lỗi kèm object gồm mã lỗi, tin nhắn, nơi báo lỗi
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }
  res.status(responseError.statusCode).json(responseError)
}

# BUILD_MODE = production hay dev quan trọng thế nào, nếu là dev thì khi báo lỗi sẽ hiện thị stack để dev biết lỗi từ đâu, ngược
# lại môi trường production thì cần xóa stack này đi để tránh ng dùng nắm được cấu trúc dự án
# cài đặt cross-env và thiết lập cấu hình production, dev trong script của pakage.json
1. Cài đặt cross-env
2. Sửa lại file pakage.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint src --ext js --report-unused-disable-directives --max-warnings 0",
    "clean": "rimraf build && mkdir build",
    "build-babel": "babel ./src -d ./build/src",
    "build": "npm run clean && npm run build-babel",
    "production": "npm run build && cross-env BUILD_MODE=production node ./build/src/server.js",
    "dev": "cross-env BUILD_MODE=dev nodemon --exec babel-node ./src/server.js"
  },
3. Sửa lại middleware errorHandlingMiddleware.js thêm dòng code xóa stack trade
if (env.BUILD_MODE !== 'dev') delete responseError.stack

# Trong model thao tác với CSDL rồi mà vẫn cần validate, lý do là khi coder xử lý dữ liệu ở tầng service gây ra lỗi 
# thì trước khi cập nhật vào csdl dữ liệu sẽ valid 1 lần nữa để chặn dữ liệu bị lỗi 

# lấy những bảng có liên quan đến bảng category đang lấy, giống include trong .net 
# $match là toán tử để tìm kiếm, $lookup là toán tử giống join bảng, giống hàm include trong .net để lấy các đối tượng liên quan
# from là tên bảng mún lấy dữ liệu, localField là khoá của bảng gốc, foreignField là khoá của bảng muốn lấy, giống A inner join B on A.id = b.categoryId, as là tên thuộc tính cho bảng muốn lấy kèm để client sử dụng
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from: categoryModel.COLLECTION_NAME,
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