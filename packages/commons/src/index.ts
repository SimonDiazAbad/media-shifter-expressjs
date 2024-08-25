import { ENV } from "./constants/env";
import amqp from "amqplib";

export async function getRabbitmqConnection(url: string) {
  const connection = await amqp.connect(url);

  return connection;
}
