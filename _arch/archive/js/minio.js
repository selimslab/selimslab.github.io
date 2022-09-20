import { Client } from 'minio';
import { promisify } from 'util';
import { ReadStream } from 'fs';
const path = require('path');

const fs = require('fs');
const readdir = promisify(fs.readdir);

export class MinioService {
    private minioClient: Client;
    private airoBucket = 'airo-gateway';
    private licenceBucket = 'licences';
    private bucketRegion = 'test-region';
    private baseUrl: string;
    constructor({ host, port, accessKey, secretKey }: MinioClientConfig) {
        this.baseUrl = `http://${host}:${port}`;
        this.minioClient = new Client({
            endPoint: host,
            port: +port,
            useSSL: false,
            accessKey: accessKey,
            secretKey: secretKey
        });
    }

    async initBucket(bucketName: string) {
        const bucketExists = await this.minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await this.minioClient.makeBucket(bucketName, this.bucketRegion);
        }
        await this.minioClient.setBucketPolicy(
            bucketName,
            JSON.stringify(getPublicReadonlyPolicy(bucketName))
        );
    }

    async initAiroBucket() {
        this.initBucket(this.airoBucket);
    }

    async *getLicenceFiles() {
        const licenceDir = './static/licences';
        const fileNames = await readdir(licenceDir);
        for (const fileName of fileNames) {
            const filePath = path.join(licenceDir, fileName);
            yield { fileName, filePath };
        }
    }

    async getExistingFileNames(): Promise<Set<string>> {
        var stream = this.minioClient.listObjects(this.licenceBucket, '', true);
        let existingFileNames = new Set<string>();

        return new Promise((resolve, reject) => {
            stream.on('data', obj =>  existingFileNames.add(obj.name))
            stream.on('error', reject)
            stream.on('end', () => resolve(existingFileNames))
          })
    }

    async uploadLicences() {
        this.initBucket(this.licenceBucket);
        
        const existingFileNames = await this.getExistingFileNames();
        const metadata = { 'Content-Type': 'text/html' };

        for await (let { fileName, filePath } of this.getLicenceFiles()) {
            if (existingFileNames.has(fileName)) {
                continue;
            }

            await this.minioClient.fPutObject(
                this.licenceBucket,
                fileName,
                filePath,
                metadata
            );
            console.log(fileName, 'in bucket now');
        }
    }

    async uploadSingleImage(
        readStream: ReadStream,
        fileName: string
    ): Promise<string> {
        const metaData = {
            'Content-Type': 'application/octet-stream'
        };
        const etag = await this.minioClient.putObject(
            this.airoBucket,
            fileName,
            readStream,
            metaData
        );
        const fileUrl = `${this.baseUrl}/${this.airoBucket}/${fileName}`;
        return fileUrl;
    }
}

export interface MinioClientConfig {
    host: string;
    port: string;
    accessKey: string;
    secretKey: string;
}
function getPublicReadonlyPolicy(bucketName: string) {
    return {
        Version: '2012-10-17',
        Statement: [
            {
                Sid: 'PublicRead',
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${bucketName}/*`]
            }
        ]
    };
}
