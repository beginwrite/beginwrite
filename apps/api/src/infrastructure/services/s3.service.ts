import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';

import type { ReadStream } from 'fs';

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

  public async uploadFile({
    file,
    filename,
  }: {
    file: FileUpload;
    filename: string;
  }) {
    const { createReadStream } = file;
    // MEMO: 拡張子は png に固定
    const stream = await this.loadStream(createReadStream());

    return await this.s3.send(
      new PutObjectCommand({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: filename,
        Body: stream,
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

  private loadStream(stream: ReadStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
