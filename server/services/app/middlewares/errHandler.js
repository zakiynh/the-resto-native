function errHandler(error, req, res, next) {
    console.log(error)
    switch (error.name) {
        case "SequelizeValidationError":
            code = 400;
            message = error.errors[0].message;
            break;
        case "SequelizeDatabaseError":
            code = 400;
            message = "Bad request";
            break;
        case "badRequest":
            code = 400;
            message = "Bad request";
            break;
        case "SequelizeUniqueConstraintError":
            code = 400;
            message = "Email Is Already Taken";
            message = error;
            break;
        case "SequelizeForeignKeyConstraintError":
            code = 404;
            message = "Data Not Found"
            break;
        case "incorrectLogin":
            code = 401;
            message = "Email/Password is Incorrect";
            break;
        case "Category not found":
            code = 404;
            message = "Data Not Found";
            break;
        case "Item not found":
            code = 404;
            message = "Data Not Found";
            break;
        case "Invalid token":
            code = 401;
            message = "Not Authorized";
            break;
        case "JsonWebTokenError":
            code = 401;
            message = "Not Authorized";
            break;
        case "forbidden":
            code = 403;
            message = "Forbidden To Access This Part";
            break;
        default:
            code = 500;
            message = "Internal Server Error";
            message = error.message;
            break;
    }
    res.status(code).json({ message });
}

module.exports = errHandler;