import amqplib from "amqplib";

export async function getRabbitmqConnection(url: string) {
  let connection;
  while (!connection) {
    try {
      connection = await amqplib.connect(url);
      console.log("Connected to RabbitMQ");
    } catch (err) {
      console.error("Failed to connect to RabbitMQ:", err.message);
      console.log(`Retrying in 1 second...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return connection;
}
