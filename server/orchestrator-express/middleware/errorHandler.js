function errorHandler(error, req, res, next) {
    let code, message;
    if (error.name === "Error") error.name = error.message;
    switch (error.name) {
        case "forbidden":
            code = 403;
            message = "Forbidden To Access This Part";
            break;
        case "Request failed with status code 400":
            code = 400;
            message = "Bad Request";
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