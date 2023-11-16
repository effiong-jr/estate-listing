const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log({ error });

    if (error.message) {
      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(400).json({
      status: false,
      message: "An error occured",
    });
  } else {
    next();
  }
};

export default errorHandler;
