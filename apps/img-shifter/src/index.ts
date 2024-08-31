import { MessageBrokerService, Queues } from "@media-shifter/commons";

import { ConsumeMessage } from "amqplib";

const resizeHandler = (msg: ConsumeMessage | null) => {
  if (msg) {
    const content = JSON.parse(msg.content.toString());
    console.log(`Received resize job: `);
    console.log({
      content,
    });

    const channel = MessageBrokerService.getChannel();

    channel.ack(msg);

    // console.log({
    //   content: content,
    //   fields: msg.fields,
    //   properties: msg.properties,
    // });
    // Add your resize handling logic here...
  }
};

async function startConsumer() {
  const messageBroker = MessageBrokerService.getInstance("amqp://rabbitmq");

  await messageBroker.connect();

  // Asserting Queues
  await messageBroker.assertQueue(Queues.IMAGES.RESIZE);
  await messageBroker.assertQueue(Queues.IMAGES.INVERT);
  await messageBroker.assertQueue(Queues.IMAGES.REMOVE_BACKGROUND);
  await messageBroker.assertQueue(Queues.IMAGES.UPSCALE);

  // Consuming Messages
  await messageBroker.consume(Queues.IMAGES.RESIZE, resizeHandler);
  await messageBroker.consume(Queues.IMAGES.INVERT, resizeHandler);
  await messageBroker.consume(Queues.IMAGES.REMOVE_BACKGROUND, resizeHandler);
  await messageBroker.consume(Queues.IMAGES.UPSCALE, resizeHandler);

  console.log("🟢 Consumers are set up and listening to queues");
}

startConsumer();

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

process.on("SIGINT", async () => {
  console.log("🟡 Shutting down gracefully...");
  await MessageBrokerService.close();
  process.exit(0);
});
