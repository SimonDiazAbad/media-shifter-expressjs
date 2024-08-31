import * as Minio from "minio";
import { MINIO_ENV } from "../../constants";

interface PutObjectParams {
  bucket: string;
  dataType: "input" | "output";
  objectName: string;
  stream: Buffer | string;
  metadata?: Record<string, string | number>;
}

export class ObjectStorageService {
  private static instance: ObjectStorageService;
  private static client: Minio.Client;

  private constructor(params?: Minio.ClientOptions) {
    ObjectStorageService.client = new Minio.Client({
      endPoint: MINIO_ENV.MINIO_ENDPOINT,
      port: Number(MINIO_ENV.MINIO_PORT),
      useSSL: false,
      accessKey: MINIO_ENV.MINIO_ACCESS_KEY,
      secretKey: MINIO_ENV.MINIO_SECRET_KEY,
      ...params,
    });
  }

  public static getInstance(
    params?: Minio.ClientOptions
  ): ObjectStorageService {
    if (!ObjectStorageService.instance) {
      ObjectStorageService.instance = new ObjectStorageService(params);
    }
    return ObjectStorageService.instance;
  }

  public getClient(): Minio.Client {
    return ObjectStorageService.client;
  }

  public async putObjectWrapper(params: PutObjectParams) {
    const minioClient = ObjectStorageService.client;

    console.log({
      bucket: params.bucket,
      dataType: params.dataType,
      objectName: `${params.dataType}/${params.objectName}`,
      stream: params.stream,
    });

    return await minioClient.putObject(
      params.bucket,
      `${params.dataType}/${params.objectName}`,
      params.stream,
      null,
      params.metadata
    );
  }
}
