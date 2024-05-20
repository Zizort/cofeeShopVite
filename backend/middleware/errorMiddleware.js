const notFound = (req, res, next) => { //not found error
    const error =  new Error(`Not Found- ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => { // if code is 200 change it to 500 else keep the code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //check for mongoose invalid ObjectId // this wont run because mongoose throw its own error before reaching here so you need to check manually if the the id is valid and throw the err
    if (err.name === 'castError' && err.kind === 'ObjectId') {
        message = `Ressource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞': err.stack,
    });
};

export { notFound, errorHandler };