const errorTypes = require("../utils/errorTypes")

function errorHandler(error, req, res, next) {
    let code, message;
    switch (error.name) {
        case errorTypes.BadRequest:
            code = 400;
            message = "Bad request";
            break;
        case errorTypes.dataNotFound:
            code = 404;
            message = "Data Not Found";
            break;
        case errorTypes.missingId:
            code = 400;
            message = "Missing Id";
            break;
        case errorTypes.BSONTypeError:
            code = 400;
            message = "Wrong Id Format";
            break;
        default:
            code = 500;
            message = "Internal Server Error";
            message = error.message;
            break;
    }
    res.status(code).json({ message });
}

module.exports = errorHandler;