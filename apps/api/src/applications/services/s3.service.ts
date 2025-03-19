import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  public s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    forcePathStyle: true,
  });

  public async uploadFile(key: string, file: Buffer) {
    return await this.s3.send(
      new PutObjectCommand({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: key,
        Body: file,
      }),
    );
  }

  public async deleteFile(key: string) {
    return await this.s3.send(
      new DeleteObjectCommand({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: key,
      }),
    );
  }

  public async getFile(key: string) {
    return await this.s3.send(
      new GetObjectCommand({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: key,
      }),
    );
  }
}
