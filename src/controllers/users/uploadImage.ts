import { Request, Response } from 'express';
import { UploadApiResponse } from 'cloudinary';
import boom from '@hapi/boom';
import { catchAsync } from '../../utils/catchAsync';
import { UsersService } from '../../services/usersService';

const usersService = UsersService.getInstance();

export const uploadImage = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (file && file?.path !== undefined) {
    const image: UploadApiResponse = await usersService.uploadImage(file);
    const newImage = {
      public_id: image?.public_id,
      secure_url: image?.secure_url,
      original_filename: image?.original_filename,
      format: image?.format,
      width: image?.width,
      height: image?.height,
    };

    res.status(200).json(newImage);
  } else {
    throw boom.badRequest('No files provided');
  }
});
