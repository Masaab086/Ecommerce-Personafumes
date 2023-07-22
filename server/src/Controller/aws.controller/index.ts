import dotenv from "dotenv";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);
import e, { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { catchAsync } from "../../utils/catch.async";

dotenv.config({ path: "../../../.env" });

// const region = "us-east-1";
// const bucketName = "personafumes-development";
// const accessKeyId = "AKIAYT5NXNS2LO7LINOT";
// const secretAccessKey = "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";

const region: any = "me-south-1";
const bucketName: any = "personafumes";
const accessKeyId: any = "AKIAVV2DARWDP65VMJ4K";
const secretAccessKey: any = "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";

// Initilizaing s3 object
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// Generating a secure url for adding new file to s3
export async function generateUploadURL(path: string) {
  const rawBytes = await randomBytes(16);
  const imageName = path + rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
// Generating a secure url for adding new file to s3
export async function generateUpdateURL(path: string) {
  const imageName = path.split("/");

  const params = {
    Bucket: bucketName,
    Key: imageName[imageName.length - 1],
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

// DeleteFile function to delete a file from s3 url
export const deleteFile = async (url: any) => {
  let tempUrl = url.split("/");
  const params = {
    Bucket: bucketName,
    Key: tempUrl[tempUrl.length - 1],
  };
  await s3.deleteObject(params).promise();
  return true;
};

// API conrtoller that provides the upload url
export const getUploadUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const url: any = await generateUploadURL(`${req.params.folder}/`);
    res.json({
      status: "status",
      code: "secure_url_created",
      message: "A secure url has been created",
      secureUrl: url,
    });
  }
);
// API conrtoller that provides the update url for file update
export const getUpdateUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldUrl = req.body.url;
    const url: any = await generateUpdateURL(oldUrl);
    res.json({
      status: "status",
      code: "secure_url_created",
      message: "A secure url has been created",
      secureUrl: url,
    });
  }
);

// API Controller that delet file by url
export const deleteFileByUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const url = req.body.url;
    const status: any = await deleteFile(url);

    if (status) {
      res.json({ message: "Success" });
    } else {
      res.json({ message: "Failed" });
    }
  }
);
