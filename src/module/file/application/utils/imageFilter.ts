export const imageFilter = (req: Request, file, callback) => {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('invalid format type'), false);
    }
    callback(null, true);
  };
  