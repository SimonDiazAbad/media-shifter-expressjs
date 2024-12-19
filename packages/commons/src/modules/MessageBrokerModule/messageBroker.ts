import amqplib, { Channel, Connection, ConsumeMessage } from "amqplib";
import { waitUntil } from "../../utils";

export class MessageBrokerService {
  private static instance: MessageBrokerService;
  private static connection: Connection | null = null;
  private static channel: Channel | null = null;
  private readonly url: string;

  private constructor(url: string) {
    this.url = url;
  }

  public static getInstance(url?: string): MessageBrokerService {
    if (!MessageBrokerService.instance) {
      MessageBrokerService.instance = new MessageBrokerService(url);
    }
    return MessageBrokerService.instance;
  }

  public async connect(): Promise<void> {
    if (!MessageBrokerService.connection) {
      MessageBrokerService.connection = await waitUntil(
        async () => {
          console.log("🟡 Connecting to RabbitMQ...");
          return await amqplib.connect(this.url);
        },
        {
          interval: 500,
          timeout: 10000,
          retryOnError: true,
          throwTimeout: true,
        }
      );
    }

    MessageBrokerService.channel =
      await MessageBrokerService.connection.createChannel();

    console.log("🟢 Connected to RabbitMQ");
    if (!MessageBrokerService.channel && MessageBrokerService.connection) {
      MessageBrokerService.channel =
        await MessageBrokerService.connection.createChannel();
    }
  }

  public async assertQueue(queueName: string) {
    if (!MessageBrokerService.channel) {
      throw new Error("Channel is not created. Call connect() first.");
    }
    return await MessageBrokerService.channel.assertQueue(queueName, {
      durable: true,
    });
  }

  public publishToQueue(queueName: string, message: any) {
    if (!MessageBrokerService.channel) {
      throw new Error("Channel is not created. Call connect() first.");
    }
    MessageBrokerService.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      }
    );
  }

  public static async close(): Promise<void> {
    if (MessageBrokerService.connection) {
      await MessageBrokerService.connection.close();
      MessageBrokerService.connection = null;
      MessageBrokerService.channel = null;
    }
  }

  public static getConnection(): Connection | null {
    return MessageBrokerService.connection;
  }

  public static getChannel(): Channel | null {
    return MessageBrokerService.channel;
  }

  public async consume(
    queueName: string,
    handler: (msg: ConsumeMessage | null) => void,
    config?: amqplib.Options.Consume
  ) {
    if (!MessageBrokerService.channel) {
      throw new Error("Channel is not created. Call connect() first.");
    }
    await MessageBrokerService.channel.consume(queueName, handler, {
      ...config,
    });
  }
}
